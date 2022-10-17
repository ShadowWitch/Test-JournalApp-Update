import { signInWithGoogle } from "../../firebase/providers"
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
        console.log(result)

        if(!result.ok) return dispatch(logout(result.errorMessage))

        dispatch(login(result))

    }
}