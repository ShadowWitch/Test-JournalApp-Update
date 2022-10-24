import { TurnedInNot } from "@mui/icons-material"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useMemo } from "react"
import { useDispatch } from "react-redux"
import { setActiveNote } from "../../store/journal/journalSlice"

// Aca pondre "memo"
export const SideBarItem = ({title='', body, ids, date, imageUrls=[]}) => {
    const dispatch = useDispatch()

    // console.log('ME SIDE')

    const newTitle = useMemo(() => {
        // console.log('Me lancesss', title)
        return title.length > 10
            ? title.substring(0, 10) + '...'
            : title
    }, [title])

    const newBody = useMemo(() => {
        return body.length > 10
            ? body.substring(0, 10) + '...'
            : body
    }, [body])


    // Esto es lo mismo de arriba, no lo veo absolutamente nada de diferencia con el "useMemo", solo que al llamarlo en el ListItem tendriamos que ponerle "newTitle()"
    // const newTitle = () =>{
    //     console.log('Me lance')
    //     return title.length > 17
    //         ? title.substring(0, 17) + '...'
    //         : title 
    // }

    const onClickNote = () =>{
        // console.log('hola')
        dispatch(setActiveNote({
            ids,
            title,
            body,
            date,
            imageUrls
        }))
    }

    // console.log(`Nos cargamos desde ${title}`)

  return (
    <ListItem disablePadding>
        <ListItemButton onClick={onClickNote}>
            <ListItemIcon>
                <TurnedInNot />
            </ListItemIcon>

            <Grid container sx={{display: 'flex', flexDirection: 'column'}}>
                <ListItemText primary={newTitle} />
                <ListItemText secondary={body} />
            </Grid>

        </ListItemButton>
    </ListItem>
  )
}
