import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import ResultScreen from '../screens/ResultScreen';
import CategoryScreen from '../screens/CategoryScreen';
import MatchingScreen from '../screens/MatchingScreen';
import LoadingScreen from '../screens/LoadingScreen';
import MatchingResultScreen from '../screens/MatchingResultScreen';
import SharedResultScreen from '../screens/SharedResultScreen';
import SharedCompatibilityResultScreen from '../screens/SharedCompatibilityResultScreen';
import PhotoStoryScreen from '../screens/PhotoStoryScreen';
import SharedPhotoStoryScreen from '../screens/SharedPhotoStoryScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
    console.log('AppNavigator 렌더링 중');
    
    const linking = {
        prefixes: [
            'https://uddangtangtang-app.vercel.app',
            'http://localhost:19006'
        ],
        config: {
            screens: {
                '우당탕탕 여행 성향': '',
                '여행 성향 테스트 알아보기': 'onboarding',
                '결과 확인하기': 'result',
                '당신의 여행 유형은?': 'category',
                '여행 궁합 알아보기': 'matching',
                '궁합 분석하는 중..': 'loading',
                '여행 궁합 결과는?': 'matching-result',
                '여행 성향 결과': 'result/:shareId',
                '여행 궁합 결과': 'compatibility-result/:shareId',
                '궁합네컷': 'photo-story/create',
                '궁합네컷 결과': 'photo-story/:id'
            }
        }
    };

    // 화면 전환 애니메이션 설정
    const screenOptions = {
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
        cardOverlayEnabled: false,
        cardStyleInterpolator: ({ current: { progress } }) => ({
            cardStyle: {
                opacity: progress,
            },
        }),
    };
    
    return (
        <NavigationContainer linking={linking}>
            <Stack.Navigator 
                initialRouteName="우당탕탕 여행 성향"
                screenOptions={screenOptions}
            >
                <Stack.Screen 
                    name="우당탕탕 여행 성향" 
                    component={HomeScreen}
                />
                <Stack.Screen
                    name="여행 성향 테스트 알아보기"
                    component={OnboardingScreen}
                />
                <Stack.Screen
                    name="결과 확인하기"
                    component={ResultScreen}
                />
                <Stack.Screen
                    name="당신의 여행 유형은?"
                    component={CategoryScreen}
                />
                <Stack.Screen
                    name="여행 궁합 알아보기"
                    component={MatchingScreen}
                />
                <Stack.Screen
                    name="궁합 분석하는 중.."
                    component={LoadingScreen}
                />
                <Stack.Screen
                    name="여행 궁합 결과는?"
                    component={MatchingResultScreen}
                />
                <Stack.Screen
                    name="여행 성향 결과"
                    component={SharedResultScreen}
                />
                <Stack.Screen
                    name="여행 궁합 결과"
                    component={SharedCompatibilityResultScreen}
                />
                <Stack.Screen
                    name="궁합네컷"
                    component={PhotoStoryScreen}
                />
                <Stack.Screen
                    name="궁합네컷 결과"
                    component={SharedPhotoStoryScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;