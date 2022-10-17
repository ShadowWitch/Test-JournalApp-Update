
import {Link as RouterLink} from 'react-router-dom';
import { Google } from '@mui/icons-material';
import { Grid, TextField, Typography, Button, Link } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../globalhooks/useForm';
import { useState } from 'react';

const formData = {
  email: '',
  password: '',
  displayName: ''
}

const formValidations = {
  email: [ (value) => value.includes('@'), 'El correo debe tener una @' ],
  password: [ (value) => value.length >= 6, 'El password debe de tener mas de 6 letras.' ],
  displayName: [ (value) => value.length >= 1, 'El nombre es requerido.' ],
}

export const RegisterPage = () => {

  // Para evitar cargar el form con errores y mas
  const [formSubmited, setFormSubmited] = useState(false)

  const {email, password, displayName, onInputChange, formState,
        isFormValid, displayNameValid, emailValid, passwordValid,
  } = useForm(formData, formValidations);

  // console.log({displayNameValid, emailValid, passwordValid})
  // console.log(isFormValid)

  const onSubmit = (e) =>{
    e.preventDefault()

    setFormSubmited(true)

    if(!isFormValid) return;
    console.log('ENVIADO!');

  }

  return (

    <AuthLayout title='Register'>
      <h1>FormValid { isFormValid ? 'valido' : 'incorrecto'}</h1>
      <form onSubmit={onSubmit}>
        <Grid container>

          <Grid item xs={12} sx={{mt: 2}}>
            <TextField
              label='Nombre completo' 
              type='text' 
              placeholder='Jonh Doe' 
              fullWidth
              name='displayName'
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmited}
              helperText={displayNameValid}
              // helperText= null
            />
          </Grid>

          <Grid item xs={12} sx={{mt: 2}}>
            <TextField
              label='Correo' 
              type='email' 
              placeholder='example@gmail.com' 
              fullWidth
              name='email'
              value={email}
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
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmited}
              helperText={passwordValid}
            />
          </Grid>

          <Grid container spacing={2} sx={{mb: 2, mt: 1}}>

            <Grid item xs={12} sm={12}>
              <Button 
                type='submit'
                variant='contained' 
                fullWidth
              >
                Create Account
              </Button>
            </Grid>

          </Grid>

          <Grid container direction='row' justifyContent='end'>
            <Typography sx={{mr: 1}}>Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color='inherit' to='/auth/login'>
              Ingresar
            </Link>
          </Grid>

        </Grid>
      </form>
    </AuthLayout>
  )
}
