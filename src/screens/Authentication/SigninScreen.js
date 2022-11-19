import React,{useState, useContext} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';

import { SimpleLineIcons } from '@expo/vector-icons';

import FormInput from '../../components/FormInput';
import IconButton from '../../components/IconButton';
import TextButton from '../../components/TextButton';

import SIZES from '../../constants/SIZES';
import COLORS from '../../constants/COLORS';
import FONTS from '../../constants/FONTS';
import icons from '../../constants/icons';

import { validateEmail } from '../../constants/Utility';

import { Context as AuthContext } from '../../context/AuthContext';
import AuthFooter from '../../components/AuthFooter';

const SigninScreen = ({ navigation }) => {

    const { signin, state, addError } = useContext(AuthContext);

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const [isLoginButtonPressed, setIsLoginButtonPressed] = useState(false);

    //console.log(state);

    return(
        <View style={styles.container}>
            {/* Logo */}
            <SimpleLineIcons 
                name="wallet" 
                size={50} 
                color={COLORS.primary} 
                style={styles.image}
            />
            <View style={{...styles.formContainer, ...styles.shadow}}>
                <Text style={styles.text}>
                    Sign In To Squander
                </Text>
                {<Text style={styles.error}>{state.errorMessage}</Text>}  
                {/* Email */}
                <FormInput 
                    containerStyle={styles.containerStyle}
                    placeholder="Email"
                    value={email}
                    onChange={(text)=> {
                        addError('')
                        setEmail(text)
                    }}
                    prependComponent={
                        <Image 
                            source={icons.email}
                            style={styles.icon}
                        />
                    }
                    maxLength={30}
                />        
                {/* Password */}
                <FormInput 
                    containerStyle={styles.containerStyle}
                    placeholder="Password"
                    value={password}
                    secureTextEntry={!isPasswordVisible}
                    onChange={(text)=> {
                        addError('')
                        setPassword(text)
                    }}
                    prependComponent={
                        <Image 
                            source={icons.lock}
                            style={styles.icon}
                        />
                    }
                    appendComponent={
                        <IconButton 
                            icon={ isPasswordVisible ? icons.eye_off : icons.eye}
                            iconStyle={{
                                tintColor : COLORS.primary
                            }}
                            onPress={()=>setIsPasswordVisible(!isPasswordVisible)}
                        />
                    }
                    maxLength={16}
                />
                {/* Signin Button */}
                <TextButton 
                    label="Signin"
                    contentContainerStyle={styles.buttonContainer}
                    labelStyle={{
                        ...FONTS.h3
                    }}
                    disabled={isLoginButtonPressed}
                    onPress={()=> {
                        if(!email) return addError('Please Enter Your Email');
                        if(!validateEmail(email)) return addError('Entered Email Is Invalid');
                        if(!password) return addError('Please Enter Your Password');
                        setIsLoginButtonPressed(true);
                        signin({email, password, setIsLoginButtonPressed}, ()=> {
                            setEmail('');
                            setPassword('')
                            navigation.navigate('Home')
                        });
                    }}
                />  
            </View>
            {/* Auth Container Footer */}
            <AuthFooter navigation={navigation} navigationText="Signup"/> 
        </View>
    )
}

const styles = StyleSheet.create({
    container :{
        flex : 1,
        paddingHorizontal : SIZES.padding,
        backgroundColor : COLORS.white,
        marginVertical : 10
    },
    image :{
        alignSelf :'center',
        marginTop : SIZES.padding * 2,
        width : 50,
        height : 50
    },
    formContainer :{
        marginTop : SIZES.padding,
        height : SIZES.height * 0.55,
        width : SIZES.width - (SIZES.padding * 2),
        padding : SIZES.padding,
        borderRadius : SIZES.radius * 2,
        backgroundColor : COLORS.light
    },
    authContainer :{
        flex : 1,
        width : SIZES.width - (SIZES.padding * 2),
        padding : SIZES.padding,
        borderRadius : SIZES.radius,
        //backgroundColor : COLORS.light,
        zIndex : 1
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
    text:{
        color : COLORS.primary,
        ...FONTS.h2
    },
    containerStyle:{
        marginTop: SIZES.radius,
        borderRadius : SIZES.radius
    },
    icon:{
        width : 25,
        height : 25,
        marginRight: SIZES.base,
        tintColor : COLORS.primary
    },
    checkboxContainer:{
        marginTop: SIZES.radius,
        marginBottom: SIZES.radius * 3
    },
    buttonContainer:{
        marginTop: 80,
        height: 55,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.primary
    },
    error:{
        ...FONTS.body3,
        color : COLORS.error,
        marginVertical: SIZES.radius
    }
});

export default SigninScreen;