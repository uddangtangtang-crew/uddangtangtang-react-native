import React from 'react';
import { View, Image } from 'react-native';
import { progressStyles, getCalculatedValues } from '../../styles/progressBar';

const ProgressBar = ({ current, total }) => {
    const { TOTAL_DOT_ROW_WIDTH } = getCalculatedValues();
    const airplaneImg = require('../../../assets/airplane.svg');

    return (
        <View style={progressStyles.container}>
            <View style={[progressStyles.dotRow, { width: TOTAL_DOT_ROW_WIDTH }]}>
                {Array.from({ length: current }).map((_, idx) => (
                    <View
                        key={idx}
                        style={[
                            progressStyles.dot,
                            progressStyles.active,
                        ]}
                    />
                ))}
                <Image source={airplaneImg} style={progressStyles.airplane} resizeMode="contain" />
            </View>
        </View>
    );
};

export default ProgressBar; 