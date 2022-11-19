import React from 'react';
import { View, StyleSheet, Text} from 'react-native';
import { FontAwesome} from '@expo/vector-icons';

import FONTS from '../constants/FONTS';
import COLORS from '../constants/COLORS';
import SIZES from '../constants/SIZES';

const Balance = ({ plusIcon, historyIcon })=>{

    const total = 15045.45;

    return (
        <>
            {
                total === 0 ?
                <View style={styles.container}>
                    <View style={{flexDirection : 'row'}}>
                        <Text style={styles.addBalance}>
                            Add Balance 
                        </Text>
                        <View style={{marginTop : 10}}>
                            { plusIcon }
                        </View>
                    </View>
                </View>
                :
                <View style={styles.container}>
                    <Text style={styles.message}> Your Current Balance</Text>
                    <Text style={styles.balance}>
                    <FontAwesome name="rupee" size={25} color={COLORS.secondary} />
                    <View style={{ width : 20 }}></View>
                    {total.toFixed(2)}
                    <View style={{ width : 20 }}></View>
                        {plusIcon} 
                    <View style={{ width : 20 }}></View>
                        {historyIcon}
                    </Text>       
                    <Text style={styles.change}><FontAwesome name="rupee" size={12} color={COLORS.primary} /> 540 change in  Last 24 hours</Text>
                </View>
            }
        </>
      )
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent : 'center' 
    },
    message:{
        color : COLORS.primary, 
        ...FONTS.h3
    },
    balance:{
        color : COLORS.secondary, 
        ...FONTS.h1, 
        marginTop: SIZES.base,
        paddingRight : SIZES.base,
        marginLeft : SIZES.base
    },
    change:{ 
        color : COLORS.primary, 
        ...FONTS.body5 
    },
    addBalance:{
        color : COLORS.primary, 
        ...FONTS.h2, 
        marginTop: SIZES.base,
        //paddingRight : SIZES.base,
        marginHorizontal : SIZES.base 
    }
});

export default Balance;