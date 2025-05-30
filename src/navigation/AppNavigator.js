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

const Stack = createStackNavigator();

const AppNavigator = () => {
    console.log('AppNavigator 렌더링 중');
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="여행 궁합 알아보기">
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
                    name="LoadingScreen"
                    component={LoadingScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="MatchingResultScreen"
                    component={MatchingResultScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;