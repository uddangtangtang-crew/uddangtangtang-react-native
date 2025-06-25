import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, useWindowDimensions } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import CategoryScreen from './CategoryScreen';
import { ENV } from '../config/env';

const SharedResultScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const { shareId } = route.params;
    const [resultData, setResultData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 반응형 width/height 적용
    const { width, height } = useWindowDimensions();
    const frameWidth = Math.min(width, 500);
    const frameHeight = Math.min(height, 900);
    const textPadding = 16;

    useEffect(() => {
        fetchSharedResult();
    }, [shareId]);

    const fetchSharedResult = async () => {
        try {
            console.log('🔗 공유된 결과 로딩, shareId:', shareId);
            
            const response = await fetch(`${ENV.API_BASE_URL}/ai/type/share/${shareId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`서버 응답 오류: ${response.status}`);
            }

            const data = await response.json();
            console.log('📄 서버에서 받은 공유 결과:', data);

            if (data.isSuccess && data.result) {
                setResultData({ result: data.result });
            } else {
                throw new Error('잘못된 공유 링크입니다.');
            }
        } catch (error) {
            console.error('❌ 공유된 결과 로딩 실패:', error);
            setError(error.message);
            Alert.alert('오류', '공유된 결과를 불러올 수 없습니다.');
        } finally {
            setLoading(false);
        }
    };

    // 나도 테스트하고 궁합 보기 핸들러
    const handleTakeTestAndCheckCompatibility = () => {
        if (resultData?.result?.typeName) {
            // A의 유형을 저장하고 테스트 화면으로 이동
            navigation.navigate('여행 성향 테스트 알아보기', {
                partnerType: resultData.result.typeName, // A의 유형을 partnerType으로 전달
                isFromSharedResult: true // 공유 결과에서 온 것임을 표시
            });
        }
    };

    if (loading) {
        return (
            <View style={[styles.container, { width: frameWidth, minHeight: frameHeight, paddingHorizontal: textPadding }]}> 
                <ActivityIndicator size="large" color="#4A90E2" />
                <Text style={styles.loadingText}>공유된 결과를 불러오는 중...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.container, { width: frameWidth, minHeight: frameHeight, paddingHorizontal: textPadding }]}> 
                <Text style={styles.errorText}>❌ 오류: {error}</Text>
            </View>
        );
    }

    // 실제 결과 화면 렌더링 (CategoryScreen 재사용하되 추가 버튼 전달)
    return (
        <CategoryScreen 
            route={{ params: { resultData } }} 
            navigation={navigation}
            onTakeTestAndCheckCompatibility={handleTakeTestAndCheckCompatibility}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 20,
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#666666',
    },
    errorText: {
        fontSize: 16,
        color: '#ff4444',
        textAlign: 'center',
    },
});

export default SharedResultScreen; 