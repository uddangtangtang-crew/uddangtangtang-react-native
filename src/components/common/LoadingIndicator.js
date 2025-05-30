import React from 'react';
import { View, Image, ActivityIndicator, Text } from 'react-native';

const LoadingIndicator = ({ 
    title = "로딩 중...", 
    subtitle, 
    imageSource,
    spinnerColor = "#CC6548",
    style 
}) => {
    const defaultImage = require('../../../assets/airplane-cute.svg');

    return (
        <View style={[loadingStyles.container, style]}>
            {/* 로딩 애니메이션 */}
            <View style={loadingStyles.loadingContainer}>
                <Image
                    source={imageSource || defaultImage}
                    style={loadingStyles.airplaneImage}
                    resizeMode="contain"
                />
                <ActivityIndicator 
                    size="large" 
                    color={spinnerColor} 
                    style={loadingStyles.spinner}
                />
            </View>

            {/* 로딩 텍스트 */}
            <View style={loadingStyles.textContainer}>
                <Text style={loadingStyles.loadingTitle}>
                    {title}
                </Text>
                {subtitle && (
                    <Text style={loadingStyles.loadingSubtitle}>
                        {subtitle}
                    </Text>
                )}
            </View>
        </View>
    );
};

const loadingStyles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    loadingContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    airplaneImage: {
        width: 120,
        height: 120,
        marginBottom: 20,
    },
    spinner: {
        marginTop: 10,
    },
    textContainer: {
        alignItems: 'center',
    },
    loadingTitle: {
        fontFamily: 'NanumSquareRound',
        fontSize: 22,
        fontWeight: 'bold',
        color: '#6E3209',
        textAlign: 'center',
        marginBottom: 15,
    },
    loadingSubtitle: {
        fontFamily: 'NanumSquareRound',
        fontSize: 16,
        color: '#6E3209',
        textAlign: 'center',
        lineHeight: 24,
    },
};

export default LoadingIndicator; 