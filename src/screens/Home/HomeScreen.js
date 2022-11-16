import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

const HomeScreen = ({ navigation }) => {
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