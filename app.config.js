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
      supportsTablet: true,
      bundleIdentifier: "com.anonymous.UddangtangtangApp"
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
      bundler: "webpack",
      config: {
        head: {
          script: [
            {
              innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-N63FQQ6F');`,
              type: 'text/javascript'
            }
          ],
          noscript: [
            {
              innerHTML: '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-N63FQQ6F" height="0" width="0" style="display:none;visibility:hidden"></iframe>'
            }
          ]
        }
      }
    },
    linking: {
      prefixes: [
        "https://uddangtangtang-app.vercel.app",
        "http://localhost:19006"
      ],
      config: {
        screens: {
          "우당탕탕 여행 성향": "",
          "여행 성향 결과": "result/:shareId",
          "여행 궁합 결과": "compatibility-result/:shareId"
        }
      }
    },
    extra: {
      apiBaseUrl: process.env.EXPO_PUBLIC_API_BASE_URL || "http://3.37.122.13:8080"
    }
  },
  name: "uddangtangtang-app"
}; 