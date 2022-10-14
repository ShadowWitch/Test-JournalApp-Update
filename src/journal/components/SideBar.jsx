
import {Drawer, Box} from '@mui/material '

export const SideBar = ( { drawerWidth = 240 } ) => {
  return (
    <Box
        component='nav'
        sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0} }}
    >
        <Drawer
            variant='permanent'
        >

        </Drawer>
    </Box>
  )
}
