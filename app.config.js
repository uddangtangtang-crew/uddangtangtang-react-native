export default {
  expo: {
    name: "UddangtangtangApp",
    slug: "UddangtangtangApp",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      edgeToEdgeEnabled: true
    },
    web: {
      favicon: "./assets/favicon.png",
      bundler: "webpack"
    },
    linking: {
      prefixes: [
        "https://uddangtangtang-app.vercel.app",
        "http://localhost:19006"
      ],
      config: {
        screens: {
          "우당탕탕 여행 성향": "",
          "공유된 결과": "result/:shareId",
          "공유된 궁합 결과": "compatibility-result/:shareId"
        }
      }
    },
    extra: {
      apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL || "http://3.37.122.13:8080"
    }
  },
  name: "uddangtangtang-app"
}; 