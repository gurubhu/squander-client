import React,{useState, useEffect, useContext} from 'react';
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

import { Context as AuthContext } from '../../context/AuthContext';
import AuthFooter from '../../components/AuthFooter';

const SignupScreen = ({ navigation }) => {

    useEffect(()=>{
        //Preventing Back Navigation
        navigation.addListener('beforeRemove',(e)=>{
            e.preventDefault();
        })
    },[]);

    const { signup, state, addError } = useContext(AuthContext);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isPasswordVisible, setIsPasswordVisible] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false)
    const [termsChecked, setTermsChecked] = useState(false)
    const [isCreateAccountButtonPressed, setIsCreateAccountButtonPressed] = useState(false);

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
                    Create New Account
                </Text>
                {<Text style={styles.error}>{state.errorMessage}</Text>} 
                {/* Name */}
                <FormInput
                    containerStyle={styles.containerStyle}
                    placeholder="Name"
                    value={name}
                    onChange={(text)=> {
                        addError('')
                        setName(text)
                    }}
                    prependComponent={
                        <Image 
                            source={icons.person}
                            style={styles.icon}
                        />
                    }
                    maxLength={20}
                />    
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
                {/* Confirm Password */}
                <FormInput 
                    containerStyle={styles.containerStyle}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    secureTextEntry={!isConfirmPasswordVisible}
                    onChange={(text)=> {
                        addError('')
                        setConfirmPassword(text)
                    }}
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
                    maxLength={16}
                />                        
                {/* Terms And Conditions */}
                <CheckBox 
                    containerStyle={styles.checkboxContainer}
                    isSelected={termsChecked}
                    onPress={()=> {
                        addError('')
                        setTermsChecked(!termsChecked)
                    }}
                />
                {/* Create Account Button */}
                <TextButton 
                    label="Create Account"
                    contentContainerStyle={styles.buttonContainer}
                    labelStyle={{
                        ...FONTS.h3
                    }}
                    disabled={isCreateAccountButtonPressed}
                    onPress={()=> {
                        if(!name || name==='') return addError('Please Enter Your Name');
                        if(!email) return addError('Please Enter Your Email');
                        if(!validateEmail(email)) return addError('Entered Email Is Invalid');
                        if(!password) return addError('Please Enter Your Password');  
                        if(!confirmPassword) return addError('Please Enter Your Confirm Password');
                        if(password !== confirmPassword) return addError('Password and Confirm Password are different');
                        if(!termsChecked) return addError('Please select Terms and Conditions.');
                        setIsCreateAccountButtonPressed(true);
                        signup({name, email, password, setIsCreateAccountButtonPressed}, ()=> {
                            setName('');
                            setEmail('');
                            setPassword('')
                            setConfirmPassword('');
                            setTermsChecked(false);
                            navigation.navigate('Home')
                        });
                    }}
                />  
            </View>
            {/* Auth Container Footer */}
            {/* <AuthFooterSignup  navigation={navigation}/> */}
            <AuthFooter navigation={navigation} navigationText="Signin"/>    
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