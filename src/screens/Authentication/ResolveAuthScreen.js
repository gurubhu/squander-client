import React, { useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ResolveAuthScreen = ({ navigation })=>{

    async function tryLocalSignin(){
        const token = await AsyncStorage.getItem('token');
        if(token){
            navigation.navigate('Home')
        }else{
            navigation.navigate('Signin')
        }
    }

    useEffect(()=>{
        tryLocalSignin();
    },[]);

    return null;
}


export default ResolveAuthScreen;