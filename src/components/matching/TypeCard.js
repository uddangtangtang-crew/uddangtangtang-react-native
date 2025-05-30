import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { matchingStyles } from '../../styles/matchingStyles';
import { TYPE_IMAGES, TYPE_NAME_IMAGES } from '../../constants/travelTypes';

const TypeCard = ({ type, onPress }) => {
    return (
        <View style={matchingStyles.typeCardWrapper}>
            <TouchableOpacity
                style={matchingStyles.typeCard}
                onPress={() => onPress(type)}
            >
                <Image
                    source={TYPE_IMAGES[type]}
                    style={matchingStyles.typeImage}
                    resizeMode="contain"
                    fadeDuration={0}
                    cache="force-cache"
                />
            </TouchableOpacity>
            <Image
                source={TYPE_NAME_IMAGES[type]}
                style={matchingStyles.typeNameImage}
                resizeMode="contain"
                fadeDuration={0}
                cache="force-cache"
            />
        </View>
    );
};

export default TypeCard; 