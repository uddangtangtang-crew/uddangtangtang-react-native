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
                '여행 성향 결과': 'result/:shareId',
                '여행 궁합 결과': 'compatibility-result/:shareId'
            }
        }
    };
    
    return (
        <NavigationContainer linking={linking}>
            <Stack.Navigator initialRouteName="우당탕탕 여행 성향">
                <Stack.Screen 
                    name="우당탕탕 여행 성향" 
                    component={HomeScreen} 
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="여행 성향 테스트 알아보기"
                    component={OnboardingScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="결과 확인하기"
                    component={ResultScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="당신의 여행 유형은?"
                    component={CategoryScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="여행 궁합 알아보기"
                    component={MatchingScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="궁합 분석하는 중.."
                    component={LoadingScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="여행 궁합 결과는?"
                    component={MatchingResultScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="여행 성향 결과"
                    component={SharedResultScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="여행 궁합 결과"
                    component={SharedCompatibilityResultScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;