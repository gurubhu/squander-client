import React,{ useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

const HomeScreen = ({ navigation }) => {
    
    useEffect(()=>{
        //Preventing Back Navigation
        navigation.addListener('beforeRemove',(e)=>{
            e.preventDefault();
        })
    },[]);


    return(
        <View style={styles.container}>
            <Text>HomeScreen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container :{
        alignItems : 'center',
        justifyContent : 'center',
        flex : 1
    }
});

export default HomeScreen;