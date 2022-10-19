import { onAuthStateChanged } from "firebase/auth"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { FirebaseAuth } from "../firebase/config"
import { login, logout } from "../store/auth"


export const useCheckAuth = () => {
 
    const { status } = useSelector(state => state.auth);
    const dispatch = useDispatch()
  
    useEffect(() => {
      // onAuthStateChanged <- Eso esta a la escucha de cuando hay un cambio en el estado de la autenticacion de un usuario cambie (al disparar esto "una vez en este caso desde el 'useEffect'") es como haber dejado un "listener" abierto esperando a que ocurra algun cambio en el estado del usuario (Este evento lo podemos hacer a nuestra propia manera, pero "firebase" ya nos ofrece esto tambien)... PERO NO es necesario "removerlo", porque SIEMPRE QUEREMOS ESTAR PENDIENTES DEL CAMBIO DE AUTENTICACION
      onAuthStateChanged(FirebaseAuth, async (user) => {
        console.log('ACA >> ', user)
        console.log('ME CARGUE', user, status)
        if(!user) return dispatch(logout(null))
  
        const {uid, email, displayName, photoURL} = user;
  
        dispatch(login({uid,email,displayName,photoURL}))
      })
  
    }, [])

    return {
        status
    }
}
