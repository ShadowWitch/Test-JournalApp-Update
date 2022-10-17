
import {Link as RouterLink} from 'react-router-dom';
import { Google } from '@mui/icons-material';
import { Grid, TextField, Typography, Button, Link } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../globalhooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { chekingAuthentication, startGoogleSignIn } from '../../store/auth';
import { useEffect, useMemo, useState } from 'react';

export const LoginPage = () => {
  const dispatch = useDispatch()
  
  const {status} = useSelector(state => state.auth)

  const {email, password, onInputChange, formState} = useForm({
    email: 'example@gmail.com',
    password: '123123'
  })

  // Si el "status" cambia, se volvera a tener el nuevo valor y si NO cambia no... Como vemos usamos "useMemo" ya que queremos "memorizar" el valor de "true" (en este caso) cada vez que "status" cambie (y luego volvera a "false" si no se cumplen la condicion de "state === checking")
  const isAuthenticated = useMemo(() => status === 'checking', [status])

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
  

  const onSubmit = (e) =>{
    e.preventDefault()

    dispatch(chekingAuthentication())
    // console.log({email, password})
  }

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn())
    // console.log('hola mundo');
  }

  return (
    <AuthLayout title='Login'>
      <form onSubmit={onSubmit}>
        <Grid container>

          <Grid item xs={12} sx={{mt: 2}}>
            <TextField
              label='Correo' 
              type='email' 
              placeholder='example@gmail.com' 
              fullWidth
              name='email'
              onChange={onInputChange}
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
            />
          </Grid>

          <Grid container spacing={2} sx={{mb: 2, mt: 1}}>

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
