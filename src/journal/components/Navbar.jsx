import { LoginOutlined, MenuBookOutlined, MenuOutlined } from "@mui/icons-material"
import { AppBar, IconButton, Toolbar, Grid, Typography } from "@mui/material"

export const Navbar = ( { drawerWidth = 240 } ) => {
  return (
    <AppBar 
        position='fixed'
        sx={{
            width: {sm: `calc(100% - ${drawerWidth}px)`}, // Que en dispositivos "sm" me haga un calculo del "100%" de su pantall y le "rest" el "draerWidth" (que en este caso es "240")
            ml: {sm: `${drawerWidth}px`}
        }}
    >
        <Toolbar>
            <IconButton 
                color='inherit'
                edge='start'
                sx={{mr: 2, display: {sm: 'none'}}}
            >
                <MenuOutlined />
            </IconButton>

            <Grid container direcion='row' justifyContent='space-between' alignItems='center'>
                <Typography variant='h6' noWrap component='div'>JournalApp</Typography>

                <IconButton color='error'>
                    <LoginOutlined />
                </IconButton>
            </Grid>

        </Toolbar>
    </AppBar>
  )
}
