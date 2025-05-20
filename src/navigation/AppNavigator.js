import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import OnboardingScreen from '../screens/OnboardingScreen';


const Stack = createStackNavigator();

const AppNavigator = () => {
    console.log('AppNavigator 렌더링 중');
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="우당탕탕 여행 궁합">
                <Stack.Screen 
                name="우당탕탕 여행 궁합" 
                component={HomeScreen} 
                options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="우당탕탕 여행 궁합 테스트"
                    component={OnboardingScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;