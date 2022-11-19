import React, { useContext, useState } from 'react';
import {
    Text,
    StyleSheet,
    View
} from 'react-native';

import TextButton from './TextButton';

import FONTS from '../constants/FONTS';
import COLORS from '../constants/COLORS';
import SIZES from '../constants/SIZES';

const AuthFooterSignin = ({ navigation })=>{
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
               Don't have an account.
            </Text>
            <TextButton
               label={"Sign Up"}
               contentContainerStyle={styles.contentContainerStyle}
               labelStyle={styles.labelStyle}
               onPress={()=> {
                       navigation.navigate('Signup')
                }}
            />
        </View>
   )
}

const styles = StyleSheet.create({
    container : {
        flexDirection : 'row',
        //height : 80,
        alignItems: 'flex-end',
        justifyContent : 'center',
        marginTop : 18,
        marginHorizontal: SIZES.radius,
        paddingBottom : SIZES.radius,
        borderBottomLeftRadius : SIZES.radius,
        borderBottomRightRadius : SIZES.radius,
        backgroundColor: COLORS.light60,
        zIndex: 0
    },
    text:{
        color : COLORS.grey,
        ...FONTS.body5  
    },
    contentContainerStyle:{
        marginLeft : SIZES.base,
        backgroundColor : null
    },
    labelStyle:{
        color : COLORS.support3,
        ...FONTS.h5
    }
});

export default AuthFooterSignin;