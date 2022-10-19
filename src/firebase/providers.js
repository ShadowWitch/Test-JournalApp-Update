import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () =>{

    try {

        const result = await signInWithPopup(FirebaseAuth, googleProvider)        
        // const credentials = GoogleAuthProvider.credentialFromResult(result)
        const {displayName, email, photoURL, uid} = result.user

        return {
            ok: true,
            // User info
            displayName,
            email,
            photoURL,
            uid
        }
        
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        // console.log('ERROR > ', errorMessage);

        return {
            ok: false,
            errorMessage
        }
    }

}


export const registerUserWithEmailPassword = async ({email, password, displayName}) =>{

    try {

        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password)
        const {uid, photoURL} = resp.user;

        // Actualizar el displayName del user en FireBase (Ya que por defecto viene en null)
        // FirebaseAuth.currentUser <- Eso es para saber el usuario que esta autenticado actualmente... Ya que el "createUserWithEmailAndPassword" lo registra y lo logea a la vez

        // console.log('ACA >> ', FirebaseAuth.currentUser)

        // Esto regresara una "Promise"
        await updateProfile(FirebaseAuth.currentUser, {displayName})

        return {
            ok: true,
            // User info
            uid,
            photoURL,
            email,
            displayName
        }

    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        // console.log('ERROR > ', errorMessage);

        return {
            ok: false,
            errorCode,
            errorMessage
        }
    }
}


export const loginWithEmailPassword = async ({email, password}) => {

    // signInWithEmailAndPassword
    try {
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password)
        // console.log(resp)
        const { accessToken, displayName, photoURL, uid } = resp.user
        // console.log('RESPP >> ', resp)

        return {
            ok: true,
            email,
            accessToken,
            displayName,
            photoURL,
            uid
        }

    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        
        console.log(errorMessage, 'code >> ', errorCode)
        
        return {
            ok: false,
            errorCode,
            errorMessage
        }
    }
}

export const logoutFirebase = async () => {

    return await FirebaseAuth.signOut() // "signOut()" cierra la sesion de todo (Google, Correo con Email y password, etc)

}



