import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from '../../styles/common';

const ShareButtons = ({ onShare, onCopyLink }) => {
    return (
        <View style={styles.shareButtonContainer}>
            <TouchableOpacity
                onPress={onCopyLink}
                style={styles.shareButton}
            >
                <Text style={{ fontSize: 20 }}>🔗</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={onShare}
                style={styles.shareButton}
            >
                <Text style={{ fontSize: 20 }}>💬</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ShareButtons; 