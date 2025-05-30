import React from 'react';
import { Image } from 'react-native';
import { styles } from '../../styles/common';

const BackLayer = ({ style, variant = 'default' }) => {
    const backLayerImg = require('../../../assets/back-layer.svg');
    
    const getStyle = () => {
        switch (variant) {
            case 'result':
                return [styles.backLayerImg, style];
            case 'onboard':
                return [styles.backLayerImg, style];
            default:
                return [styles.backLayerImg, style];
        }
    };

    return (
        <Image 
            source={backLayerImg} 
            style={getStyle()} 
            resizeMode="cover"
            fadeDuration={0}
            cache="force-cache"
        />
    );
};

export default BackLayer; 