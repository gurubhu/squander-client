import React,{ useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    ScrollView
} from 'react-native';

import { FontAwesome, Octicons} from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import JWT from 'expo-jwt';

import COLORS from '../../constants/COLORS';

import HomeHeader from '../../components/HomeHeader';
import Balance from '../../components/Balance';

const HomeScreen = ({ navigation }) => {

    const [userName, setUserName] = useState('');

    async function getUserName(){
        const token = await AsyncStorage.getItem('token');
        const result= JWT.decode(token, 'MY_SECRET_KEY');
        const names = result.userName.split(' ');
        setUserName(names[0]);
    }
    
    useEffect(()=>{
        //Preventing Back Navigation
        navigation.addListener('beforeRemove',(e)=>{
            if(e.data.action.type==="GO_BACK"){
                e.preventDefault();
            }else{
                return;
            }               
        })
        getUserName();
    },[userName]);


    return(
        <ScrollView>
            <View style={styles.container}>
                <View style={{ width : "100%", height : 290,...styles.shadow}} >
                    <HomeHeader name={userName} navigation={navigation}/>
                    <Balance
                        plusIcon={
                            <FontAwesome 
                                name="plus-circle" 
                                size={25} color={COLORS.primary} 
                                onPress={()=> console.log('Add Balance')} 
                                style={{ marginLeft : 10}}
                            />
                        }
                        historyIcon={
                            <Octicons name="history" 
                                size={25} color={COLORS.primary}
                                onPress={()=> console.log('show history')} 
                                style={{ marginLeft : 10}}
                            />
                        }
                            />
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