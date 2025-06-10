import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert, useWindowDimensions } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import MatchingResultScreen from './MatchingResultScreen';
import { ENV } from '../config/env';
import { logAnalyticsEvent } from '../config/firebase';

const SharedCompatibilityResultScreen = () => {
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
        fetchSharedCompatibilityResult();
    }, [shareId]);

    const fetchSharedCompatibilityResult = async () => {
        try {
            console.log('🔗 공유된 궁합 결과 로딩, shareId:', shareId);
            logAnalyticsEvent('shared_compatibility_view', { shareId });
            
            console.log('🌐 API URL:', `${ENV.API_BASE_URL}/ai/type/compatibility/share/${shareId}`);
            
            const response = await fetch(`${ENV.API_BASE_URL}/ai/type/compatibility/share/${shareId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const responseText = await response.text();
            console.log('📄 서버 응답 텍스트:', responseText);

            if (!response.ok) {
                throw new Error(`서버 응답 오류: ${response.status}\n응답 내용: ${responseText}`);
            }

            let data;
            try {
                data = JSON.parse(responseText);
            } catch (e) {
                console.error('JSON 파싱 오류:', e);
                throw new Error('서버 응답을 파싱할 수 없습니다.');
            }

            console.log('📄 서버에서 받은 공유 궁합 결과:', data);

            if (data.isSuccess && data.result) {
                setResultData(data);
                logAnalyticsEvent('shared_compatibility_success', { shareId });
            } else {
                throw new Error('잘못된 공유 링크입니다.');
            }
        } catch (error) {
            console.error('❌ 공유된 궁합 결과 로딩 실패:', error);
            logAnalyticsEvent('shared_compatibility_error', { 
                shareId,
                errorMessage: error.message 
            });
            setError(error.message);
            Alert.alert('오류', '공유된 궁합 결과를 불러올 수 없습니다.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={[styles.container, { width: frameWidth, minHeight: frameHeight, paddingHorizontal: textPadding, alignSelf: 'center' }]}> 
                <View style={styles.contentContainer}>
                    <ActivityIndicator size="large" color="#4A90E2" />
                    <Text style={styles.loadingText}>공유된 궁합 결과를 불러오는 중...</Text>
                </View>
            </View>
        );
    }

    if (error) {
        return (
            <View style={[styles.container, { width: frameWidth, minHeight: frameHeight, paddingHorizontal: textPadding, alignSelf: 'center' }]}> 
                <View style={styles.contentContainer}>
                    <Text style={styles.errorText}>❌ 오류: {error}</Text>
                </View>
            </View>
        );
    }

    // 실제 궁합 결과 화면 렌더링 (MatchingResultScreen 재사용)
    return <MatchingResultScreen route={{ params: { apiResponse: resultData } }} navigation={navigation} />;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    loadingText: {
        marginTop: 16,
        fontSize: 16,
        color: '#666666',
        textAlign: 'center',
    },
    errorText: {
        fontSize: 16,
        color: '#ff4444',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
});

export default SharedCompatibilityResultScreen; 