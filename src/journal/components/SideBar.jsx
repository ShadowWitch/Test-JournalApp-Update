
import { TurnedInNot } from '@mui/icons-material'
import { Divider, Drawer, Box, Typography, Toolbar, List, ListItem, ListItemButton, ListItemIcon, Grid, ListItemText } from '@mui/material'

export const SideBar = ( { drawerWidth = 240 } ) => {
  return (
    <Box
        component='nav'
        sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0} }}
    >
        <Drawer
            variant='permanent' // temporary
            open
            sx={{
              display: {xs: 'block'},
              '& .MuiDrawler-paper': {boxSizing: 'border-box', width: drawerWidth}
            }}
        >

          <Toolbar>
            <Typography variant='h6' noWrap component='div'>Fernando Herrera</Typography>  
          </Toolbar>
          <Divider />

          <List>
            {
              ['Enero', 'Febrero', 'Marzo', 'Abril'].map(text => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <TurnedInNot />
                    </ListItemIcon>

                    <Grid container sx={{display: 'flex', flexDirection: 'column'}}>
                      <ListItemText primary={text} />
                      <ListItemText secondary={'lorem Wkipsonqwe '} />
                    </Grid>

                  </ListItemButton>
                </ListItem>
              ))
            }
          </List>

        </Drawer>
    </Box>
  )
}
