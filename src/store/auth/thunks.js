import { loginWithEmailPassword, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers"
import { checkingCredentials, login, logout } from "./AuthSlice"

export const chekingAuthentication = (email, password) =>{

    return async (dispatch, getState) => {

        dispatch(checkingCredentials())
    }
}


export const startGoogleSignIn = () =>{

    return async (dispatch, getState) => {

        dispatch(checkingCredentials())

        const result = await signInWithGoogle()
        // console.log(result)

        if(!result.ok) return dispatch(logout(result.errorMessage))

        dispatch(login(result))

    }
}


export const startCreatingWithEmailAndPassword = ( {email, password, displayName} ) => {

    // console.log(email, displayName, password)

    return async (dispatch, getState) => {
        dispatch(checkingCredentials())

        const result = await registerUserWithEmailPassword({email, password, displayName})

        if(!result.ok){
            // console.log('ERROR >> ', result.errorMessage, result.errorCode)
            if(result.errorCode === 'auth/email-already-in-use') return dispatch(logout('Ese email ya esta en uso.'))
            if(result.errorCode === 'auth/invalid-email') return dispatch(logout('Email no valido.'))

            return dispatch(logout(result.errorMessage))
        }

        dispatch(login(result))
    }
}


export const startLoginWithEmailPassword = ( {email, password} ) => {

    return async (dispatch, getState) =>{
        console.log(email, password)
        dispatch(checkingCredentials())

        const result = await loginWithEmailPassword({email, password})

        if(!result.ok){
            if(result.errorCode === 'auth/wrong-password') return dispatch(logout('Password Incorrect.'))
            if(result.errorCode === 'auth/user-not-found') return dispatch(logout('Email no registrado.'))
            if(result.errorCode === 'auth/network-request-failed') return dispatch(logout('Hay problemas en la conexion de internet.'))

            return dispatch(logout(result.errorMessage))
        }

        dispatch(login(result))
    }
}

