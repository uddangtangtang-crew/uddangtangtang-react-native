import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Platform } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';
import PrimaryButtonSVG from '../../../assets/button.svg';
import SecondaryButtonSVG from '../../../assets/button2.svg';

const Button = ({
    title,
    onPress,
    style,
    textStyle,
    disabled = false,
    type = 'primary'
}) => {
    const renderSVG = () => {
        const ButtonSVG = type === 'secondary' ? SecondaryButtonSVG : PrimaryButtonSVG;
        
        if (Platform.OS === 'web') {
            return (
                <img 
                    src={type === 'secondary' ? require('../../../assets/button2.svg') : require('../../../assets/button.svg')} 
                    style={styles.svg}
                    alt="button background"
                />
            );
        }
        return (
            <ButtonSVG
                width={208}
                height={57}
                style={styles.svg}
            />
        );
    };

    return (
        <TouchableOpacity
            style={[
                styles.button,
                disabled && styles.disabledButton,
                style
            ]}
            onPress={onPress}
            disabled={disabled}
        >
            {renderSVG()}
            <Text
                style={[
                    styles.buttonText,
                    disabled && styles.disabledButtonText,
                    textStyle
                ]}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        width: 208,
        height: 57,
        borderRadius: 27,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    svg: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
    },
    disabledButton: {
        opacity: 0.5,
    },
    buttonText: {
        fontFamily: 'NanumSquareRound',
        fontWeight: '1000',
        fontSize: 20,
        lineHeight: 30,
        letterSpacing: -0.38,
        textAlign: 'center',
        zIndex: 1,
        color: 'white',
    },
    disabledButtonText: {
        color: COLORS.textLight,
    },
});

export default Button;
