import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, useWindowDimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import MatchingResultScreen from './MatchingResultScreen';
import { ENV } from '../config/env';

const SharedCompatibilityResultScreen = () => {
    const route = useRoute();
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
        fetchSharedCompatibilityResult();
    }, [shareId]);

    const fetchSharedCompatibilityResult = async () => {
        try {
            console.log('🔗 공유된 궁합 결과 로딩, shareId:', shareId);
            
            const response = await fetch(`${ENV.API_BASE_URL}/ai/type/compatibility/share/${shareId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`서버 응답 오류: ${response.status}`);
            }

            const data = await response.json();
            console.log('📄 서버에서 받은 공유 궁합 결과:', data);

            if (data.isSuccess && data.result) {
                setResultData(data);
            } else {
                throw new Error('잘못된 공유 링크입니다.');
            }
        } catch (error) {
            console.error('❌ 공유된 궁합 결과 로딩 실패:', error);
            setError(error.message);
            Alert.alert('오류', '공유된 궁합 결과를 불러올 수 없습니다.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={[styles.container, { width: frameWidth, minHeight: frameHeight, paddingHorizontal: textPadding }]}> 
                <ActivityIndicator size="large" color="#4A90E2" />
                <Text style={styles.loadingText}>공유된 궁합 결과를 불러오는 중...</Text>
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

    // 실제 궁합 결과 화면 렌더링 (MatchingResultScreen 재사용)
    return <MatchingResultScreen route={{ params: { apiResult: resultData.result } }} />;
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

export default SharedCompatibilityResultScreen; 