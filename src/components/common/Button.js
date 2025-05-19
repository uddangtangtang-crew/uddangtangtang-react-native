import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../../constants/theme';

const Button = ({
    title,
    onPress,
    style,
    textStyle,
    disabled = false,
    type = 'primary'  // primary 또는 secondary
}) => {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                type === 'secondary' ? styles.secondaryButton : styles.primaryButton,
                disabled && styles.disabledButton,
                style
            ]}
            onPress={onPress}
            disabled={disabled}
        >
            <Text
                style={[
                    styles.buttonText,
                    type === 'secondary' ? styles.secondaryButtonText : styles.primaryButtonText,
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
        paddingVertical: SIZES.medium,
        paddingHorizontal: SIZES.large,
        borderRadius: SIZES.base * 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: SIZES.base,
        minWidth: 200,
    },
    primaryButton: {
        backgroundColor: COLORS.primary,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 3,
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: COLORS.primary,
    },
    disabledButton: {
        backgroundColor: COLORS.border,
        shadowOpacity: 0,
        elevation: 0,
        borderColor: COLORS.border,
    },
    buttonText: {
        fontSize: SIZES.medium,
        ...FONTS.medium,
    },
    primaryButtonText: {
        color: 'white',
    },
    secondaryButtonText: {
        color: COLORS.primary,
    },
    disabledButtonText: {
        color: COLORS.textLight,
    },
});

export default Button;
