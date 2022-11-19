import React,{ useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView
} from 'react-native';
import COLORS from '../../constants/COLORS';

import HomeHeader from '../../components/HomeHeader';

const HomeScreen = ({ navigation }) => {
    
    useEffect(()=>{
        //Preventing Back Navigation
        navigation.addListener('beforeRemove',(e)=>{
            if(e.data.action.type==="GO_BACK"){
                e.preventDefault();
            }else{
                return;
            }
                
        })
    },[]);


    return(
        <ScrollView>
            <View style={styles.container}>
                <View style={{ width : "100%", height : 290,...styles.shadow}} >
                    <HomeHeader name="Guru" navigation={navigation}/>
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container :{
        flex : 1,
        backgroundColor : COLORS.white
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    },
});

export default HomeScreen;