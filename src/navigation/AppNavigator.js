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
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen 
                    name="Home" 
                    component={HomeScreen} 
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Onboarding"
                    component={OnboardingScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;