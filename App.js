import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useState, useEffect } from 'react';

export default function App() {
  const [timestamp, setTimestamp] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimestamp(Date.now()); // 현재 시간을 업데이트하여 이미지 URL을 변경
    }, 5000); // 5초마다 새로고침

    return () => clearInterval(interval); // 컴포넌트가 언마운트될 때 타이머 정리
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>우당탕탕 여행 궁합 누적 조회수</Text>
      <Image
        source={{
          uri: `https://myhits.vercel.app/api/hit/https%3A%2F%2Fgithub.com%2Fvmkmym?color=blue&label=hits&size=small&timestamp=${timestamp}`,
        }}
        style={styles.image}
        resizeMode="contain" // 이미지가 잘리지 않도록 설정
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8', // 배경색을 연한 회색으로 설정
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20, // 화면 가장자리 여백 추가
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', // 제목 텍스트 색상
    marginBottom: 10, // 제목과 다른 요소 간의 간격
  },
  subtitle: {
    fontSize: 16,
    color: '#555', // 부제목 텍스트 색상
    marginBottom: 20, // 부제목과 이미지 간의 간격
  },
  image: {
    width: 250, // 이미지 너비를 더 크게 설정
    height: 100, // 이미지 높이를 더 크게 설정
    marginBottom: 20, // 이미지와 다른 요소 간의 간격
  },
});