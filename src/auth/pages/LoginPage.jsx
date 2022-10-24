
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import { FormatColorReset, Google } from '@mui/icons-material';
import { Grid, TextField, Typography, Button, Link, Alert } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../globalhooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth';
import { useEffect, useMemo, useState } from 'react';

const formData = {
  email: '',
  password: '',
}

const formValidations = {
  email: [ (value) => value.includes('@'), 'El correo debe tener una @' ],
  password: [ (value) => value.length >= 6, 'El password debe de tener mas de 6 letras.' ],
}

export const LoginPage = () => {
  const dispatch = useDispatch()
  
  const {status, errorMessage} = useSelector(state => state.auth)

  const {email, password, onInputChange, formState, isFormValid, emailValid, passwordValid} = useForm(formData, formValidations)

  // Si el "status" cambia, se volvera a tener el nuevo valor y si NO cambia no... Como vemos usamos "useMemo" ya que queremos "memorizar" el valor de "true" (en este caso) cada vez que "status" cambie (y luego volvera a "false" si no se cumplen la condicion de "state === checking")
  const isAuthenticated = useMemo(() => status === 'checking', [status])

  const [formSubmited, setFormSubmited] = useState(false)

  /*
  // ============== Esta es MI manera de hacerlo sin "useMemo" ==============
  const [stateButton, setStateButton] = useState(false)
  useEffect(() => {
    console.log('ghola');
    if(status === 'checking'){
      setStateButton(true)      
    }else{
      setStateButton(false)
    }
  }, [status])
  */
  

  // ==================== ACAAAA PROBANDO REDIRECIONAR AL USER ====================
 // YA ESTA IMPLEMENTADA LA PARTE DEL LOGIN
 
  // const navigate = useNavigate()

  // useEffect(() => {
  //   if(status === 'authenticated'){
  //     navigate('/', {replace: true})
  //   }
  // }, [status])

  // ==================================================



  const onSubmit = (e) =>{
    e.preventDefault()

    setFormSubmited(true)
    if(!isFormValid) return;

    // dispatch(chekingAuthentication())
    // console.log('Es valido', formState)
    dispatch(startLoginWithEmailPassword(formState))
    // console.log({email, password})
  }

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn())
    // console.log('hola mundo');
  }

  return (
    <AuthLayout title='Login'>
      <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
        <Grid container>

          <Grid item xs={12} sx={{mt: 2}}>
            <TextField
              label='Correo' 
              type='email' 
              placeholder='example@gmail.com' 
              fullWidth
              name='email'
              onChange={onInputChange}
              error={!!emailValid && formSubmited}              
              helperText={emailValid}
            />
          </Grid>

          <Grid item xs={12} sx={{mt: 2}}>
            <TextField 
              label='Password' 
              type='password' 
              placeholder='password' 
              fullWidth
              name='password'
              onChange={onInputChange}
              error={!!passwordValid && formSubmited}              
              helperText={passwordValid}
            />
          </Grid>

          <Grid container spacing={2} sx={{mb: 2, mt: 1}}>

          {/* Si vienen datos (!!errorMessage) pues muestralo, de lo contrario NO */}
            <Grid item xs={12} sm={12} display={!!errorMessage ? '' : 'none'} >

              <Alert severity='error' >
                {errorMessage}
              </Alert>

            </Grid>

            <Grid item xs={12} sm={6}>

              <Button 
                disabled={isAuthenticated}
                type='submit' 
                variant='contained' 
                fullWidth>
                Login
              </Button>

            </Grid>

            <Grid item xs={12} sm={6}>

              <Button 
                disabled={isAuthenticated}
                variant='contained' 
                fullWidth
                onClick={onGoogleSignIn}
              >
                <Google />
                <Typography sx={{ml: 1}}>
                  Google
                </Typography>
              </Button>

            </Grid>

          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Link component={RouterLink} color='inherit' to='/auth/register'>
              Create Account
            </Link>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>
  )
}
