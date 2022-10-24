// import { Box } from "@mui/system"
import { Box, Toolbar } from "@mui/material"
import { Navbar } from "../components/Navbar"
import { SideBar } from "../components/SideBar";

export const JournalLayout = ( {children} ) => {

  const drawerWidth = 270; // Solo es para establecerle un largo al menu

  // console.log('DEsde layout')
  return (
    <Box sx={{display: 'flex'}} className='animate__animated animate__fadeIn animate__faster'>
        <Navbar drawerWidth={drawerWidth} />

        <SideBar drawerWidth={drawerWidth} />
        <Box 
            component='main'
            sx={{flexGrow: 1, p: 3}}
        > 
            <Toolbar />
            {children}

        </Box>

    </Box>
  )
}
