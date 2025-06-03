import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { styles } from '../../styles/common';

const ShareButtons = ({ onShare, onCopyLink }) => {
    // SVG 이미지 import
    const urlImage = require('../../../assets/url_image.svg');
    const kakaoImage = require('../../../assets/kakao_image.svg');

    return (
        <View style={styles.shareButtonContainer}>
            {/* 링크 복사 버튼 (왼쪽) */}
            <TouchableOpacity
                onPress={onCopyLink}
                style={styles.shareButton}
            >
                <Image
                    source={urlImage}
                    style={styles.shareButtonIcon}
                    resizeMode="contain"
                />
            </TouchableOpacity>

            {/* 카카오톡 공유 버튼 (오른쪽) */}
            <TouchableOpacity
                onPress={onShare}
                style={styles.shareButton}
            >
                <Image
                    source={kakaoImage}
                    style={styles.shareButtonIcon}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        </View>
    );
};

export default ShareButtons; 