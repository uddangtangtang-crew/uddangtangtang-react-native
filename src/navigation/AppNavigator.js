import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
// 다른 화면들은 아직 만들지 않았으므로 일단 주석 처리
// import TestScreen from '../screens/TestScreen';
// import ResultScreen from '../screens/ResultScreen';
// import CompatibilityScreen from '../screens/CompatibilityScreen';

const Stack = createStackNavigator();

// const AppNavigator = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator 
//         initialRouteName="Home"
//         screenOptions={{
//           headerShown: false,
//           cardStyle: { backgroundColor: '#fff' }
//         }}
//       >
//         <Stack.Screen name="Home" component={HomeScreen} />
//         {/* 다른 화면들은 아직 구현하지 않았으므로 주석 처리 */}
//         {/* <Stack.Screen name="Test" component={TestScreen} /> */}
//         {/* <Stack.Screen name="Result" component={ResultScreen} /> */}
//         {/* <Stack.Screen name="Compatibility" component={CompatibilityScreen} /> */}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

const AppNavigator = () => {
    console.log('AppNavigator 렌더링 중'); // AppNavigator가 렌더링될 때 로그 출력
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;