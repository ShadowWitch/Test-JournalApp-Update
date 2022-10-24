
import { TurnedInNot } from '@mui/icons-material'
import { Divider, Drawer, Box, Typography, Toolbar, List, ListItem, ListItemButton, ListItemIcon, Grid, ListItemText } from '@mui/material'
import { useSelector } from 'react-redux'
import { SideBarItem } from './SideBarItem'

export const SideBar = ( { drawerWidth = 240 } ) => {

  const {displayName} = useSelector(state => state.auth)
  const {notes} = useSelector(state => state.journal)

  // console.log('>> desde sidebar')

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
            <Typography variant='h6' noWrap component='div'>{ (displayName) ? displayName : 'Desconocido' }</Typography>  
          </Toolbar>
          <Divider />

          <List>
            {
              notes.map(note => (
                <SideBarItem key={note.ids} {...note} />
              ))
            }
          </List>

        </Drawer>
    </Box>
  )
}
