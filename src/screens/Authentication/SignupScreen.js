import React,{useState, useEffect} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';

import { SimpleLineIcons } from '@expo/vector-icons';

import FormInput from '../../components/FormInput';
import IconButton from '../../components/IconButton';
import CheckBox from '../../components/CheckBox';
import TextButton from '../../components/TextButton';

import SIZES from '../../constants/SIZES';
import COLORS from '../../constants/COLORS';
import FONTS from '../../constants/FONTS';
import icons from '../../constants/icons';

import { validateEmail } from '../../constants/Utility';

const SignupScreen = ({ navigation }) => {

    useEffect(()=>{
        //Preventing Back Navigation
        navigation.addListener('beforeRemove',(e)=>{
            e.preventDefault();
        })
    },[]);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)
    const [termsChecked, setTermsChecked] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

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
                    Create New Account
                </Text>
                {<Text style={styles.error}>{errorMessage}</Text>} 
                {/* Name */}
                <FormInput
                    containerStyle={styles.containerStyle}
                    placeholder="Name"
                    value={name}
                    onChange={(text)=> setName(text)}
                    prependComponent={
                        <Image 
                            source={icons.person}
                            style={styles.icon}
                        />
                    }
                />    
                {/* Email */}
                <FormInput 
                    containerStyle={styles.containerStyle}
                    placeholder="Email"
                    value={email}
                    onChange={(text)=> setEmail(text)}
                    prependComponent={
                        <Image 
                            source={icons.email}
                            style={styles.icon}
                        />
                    }
                />        
                {/* Password */}
                <FormInput 
                    containerStyle={styles.containerStyle}
                    placeholder="Password"
                    value={password}
                    secureTextEntry={!isPasswordVisible}
                    onChange={(text)=> setPassword(text)}
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
                />        
                {/* Confirm Password */}
                <FormInput 
                    containerStyle={styles.containerStyle}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    secureTextEntry={!isConfirmPasswordVisible}
                    onChange={(text)=> setConfirmPassword(text)}
                    prependComponent={
                        <Image 
                            source={icons.lock}
                            style={styles.icon}
                        />
                    }
                    appendComponent={
                        <IconButton 
                            icon={ isConfirmPasswordVisible ? icons.eye_off : icons.eye}
                            iconStyle={{
                                tintColor : COLORS.primary
                            }}
                            onPress={()=>setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                        />
                    }
                />                        
                {/* Terms And Conditions */}
                <CheckBox 
                    containerStyle={styles.checkboxContainer}
                    isSelected={termsChecked}
                    onPress={()=> setTermsChecked(!termsChecked)}
                />
                {/* Create Account Button */}
                <TextButton 
                    label="Create Account"
                    contentContainerStyle={styles.buttonContainer}
                    labelStyle={{
                        ...FONTS.h3
                    }}
                    disabled={false}
                    onPress={()=> {
                        if(!name || name==='') return setErrorMessage('Please Enter Your Name');
                        if(!email) return setErrorMessage('Please Enter Your Email');
                        if(!validateEmail(email)) return setErrorMessage('Entered Email Is Invalid');
                        if(!password) return setErrorMessage('Please Enter Your Password');  
                        if(!confirmPassword) return setErrorMessage('Please Enter Your Confirm Password');
                        if(password !== confirmPassword) return setErrorMessage('Password and Confirm Password are different');
                        if(!termsChecked) return setErrorMessage('Please select Terms and Conditions.');
                        setErrorMessage('')
                        navigation.navigate('Home')
                    }}
                />  
            </View>            
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
        height : SIZES.height * 0.75,
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

export default SignupScreen;