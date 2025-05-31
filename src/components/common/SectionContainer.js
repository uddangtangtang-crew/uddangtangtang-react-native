import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../../styles/common';

const SectionContainer = ({ title, children, style }) => {
    return (
        <View style={[styles.sectionContainer, style]}>
            <Text style={styles.sectionTitle}>
                {title}
            </Text>
            {children}
        </View>
    );
};

export default SectionContainer; 