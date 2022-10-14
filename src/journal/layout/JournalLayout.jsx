// import { Box } from "@mui/system"
import { Box } from "@mui/material"
import { Navbar } from "../components/Navbar"

export const JournalLayout = ( {children} ) => {

  const drawerWidth = 240; // Solo es para establecerle un largo al menu

  return (
    <Box sx={{display: 'flex'}}>
        <Navbar drawerWidth={drawerWidth} />
        {/* Navbar */}

        {/* Sidebar */}
        <Box 
            component='main'
            sx={{flexGrow: 1, p: 3}}
        > {/* Al ponerle "component='main'" es como que estuviera escribiendo "<main></main>" */}
            {/* Toolbar */}

            {children}

        </Box>

    </Box>
  )
}
