import createDataContext from "./createDataContext";
import squanderApi from '../api/squander';

const authReducer = (state, action)=>{
    switch(action.type){
        case 'signin':
            return action.payload;
        case 'signup':
            return action.payload;
        case 'signout':
            return { token : null, errorMessage : ''};
        case 'add_error':
                return action.payload;
        case 'clear_error_message':
                return {...state, errorMessage : ''};
        default:
            return state;
    }
}

const signup = dispatch =>{
    return async ({ name, email, password, setIsCreateAccountButtonPressed }, callback)=>{
        try{
            const selectedTermsAndCondition = true;
            const response = await squanderApi.post('/signup', { name, email, password, selectedTermsAndCondition});
            dispatch( { type : 'signup' , payload : { token : response.data.token , errorMessage : ''}});
            setIsCreateAccountButtonPressed(false);
            if(callback){
                callback();
            }
        }catch(error){
            setIsCreateAccountButtonPressed(false);
            if(error.message.toString().includes('422'))
                dispatch({ type: 'add_error', payload : { token : null , errorMessage : 'This email already exists.'} })
            else
                dispatch({ type: 'add_error', payload : { token : null , errorMessage : 'Problem occurred in signup.'} })
        }
    }
}

const signin = dispatch =>{
    return async ({ email, password, setIsLoginButtonPressed }, callback)=>{
        try{
            const response = await squanderApi.post('/signin', { email, password });
            dispatch( { type : 'signin' , payload : { token : response.data.token , errorMessage : ''}});
            setIsLoginButtonPressed(false);
            if(callback){
                callback();
            }
        }catch(error){
            setIsLoginButtonPressed(false);
            dispatch({ type: 'add_error', payload : { token : null , errorMessage : 'Invalid email or password.'} })
        }
    }
}

const addError = dispatch => async (errorMessage)=>{
    dispatch({ type : 'add_error', payload : { token : null , errorMessage}})
}

const clearErrorMessage = dispatch => ()=>{
    dispatch({ type : 'clear_error_message' })
}

const signout = dispatch => async (callback)=>{
    dispatch({ type : 'signout' });
    if(callback){
        callback();
    }
}

export const { Context, Provider} = createDataContext(
    authReducer,  
    { signup, addError, clearErrorMessage, signin, signout }, 
    { token : null, errorMessage : ''}
);