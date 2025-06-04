import React from 'react';
import { View, Image, useWindowDimensions } from 'react-native';
import { progressStyles, getCalculatedValues, PROGRESS_CONSTANTS } from '../../styles/progressBar';

const ProgressBar = ({ current, total }) => {
    const { width } = useWindowDimensions();
    // 기준 width: 500, 최소 width: 320
    const baseWidth = 500;
    const minWidth = 320;
    const scale = Math.max(Math.min(width, baseWidth) / baseWidth, minWidth / baseWidth);

    // dot, airplane 크기 동적 계산
    const dotWidth = PROGRESS_CONSTANTS.DOT_WIDTH * scale;
    const dotHeight = PROGRESS_CONSTANTS.DOT_HEIGHT * scale;
    const dotRadius = PROGRESS_CONSTANTS.DOT_RADIUS * scale;
    const dotMargin = PROGRESS_CONSTANTS.DOT_MARGIN * scale;
    const airplaneSize = PROGRESS_CONSTANTS.AIRPLANE_SIZE * scale;
    const totalDotRowWidth = (dotWidth + dotMargin) * total + airplaneSize;

    const airplaneImg = require('../../../assets/airplane.svg');

    return (
        <View style={progressStyles.container}>
            <View style={[progressStyles.dotRow, { width: totalDotRowWidth }]}> 
                {Array.from({ length: current }).map((_, idx) => (
                    <View
                        key={idx}
                        style={[
                            progressStyles.dot,
                            progressStyles.active,
                            {
                                width: dotWidth,
                                height: dotHeight,
                                borderRadius: dotRadius,
                                marginRight: dotMargin,
                            },
                        ]}
                    />
                ))}
                <Image source={airplaneImg} style={[progressStyles.airplane, { width: airplaneSize, height: airplaneSize }]} resizeMode="contain" />
            </View>
        </View>
    );
};

export default ProgressBar; 