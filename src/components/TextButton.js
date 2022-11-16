import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet
} from 'react-native';

import FONTS from '../constants/FONTS';
import COLORS from '../constants/COLORS';

const TextButton = ({
    contentContainerStyle,
    disabled,
    label,
    labelStyle,
    onPress
}) => {
    return (
        <TouchableOpacity
            style={{
                ...styles.container,
                ...contentContainerStyle
            }}
            disabled={disabled}
            onPress={onPress}
        >
            <Text style={{ color: COLORS.secondary, ...FONTS.h3, ...labelStyle }}>
                {label}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container :{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
    },
    text:{
        
    }
});

export default TextButton;