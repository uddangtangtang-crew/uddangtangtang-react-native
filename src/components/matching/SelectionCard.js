import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { matchingStyles } from '../../styles/matchingStyles';
import { TYPE_IMAGES } from '../../constants/travelTypes';

const SelectionCard = ({ 
    selectedType, 
    title, 
    gradientColors, 
    cardType, 
    activeCard, 
    onPress 
}) => {
    const qmarkImg = require('../../../assets/qmark.svg');

    return (
        <View style={matchingStyles.selectionCardContainer}>
            <TouchableOpacity
                style={[
                    matchingStyles.selectionCard,
                    activeCard === cardType && matchingStyles.activeSelectionCard
                ]}
                onPress={() => onPress(cardType)}
            >
                <LinearGradient
                    colors={gradientColors}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={matchingStyles.selectionCardGradient}
                >
                    {selectedType ? (
                        <Image
                            source={TYPE_IMAGES[selectedType]}
                            style={matchingStyles.selectedTypeImage}
                            resizeMode="contain"
                            fadeDuration={0}
                            cache="force-cache"
                        />
                    ) : (
                        <Image
                            source={qmarkImg}
                            style={matchingStyles.qmarkImage}
                            resizeMode="contain"
                            fadeDuration={0}
                            cache="force-cache"
                        />
                    )}
                </LinearGradient>
            </TouchableOpacity>
            <Text style={[
                matchingStyles.selectionTitle,
                activeCard === cardType && matchingStyles.activeSelectionTitle
            ]}>
                {title}
            </Text>
        </View>
    );
};

export default SelectionCard; 