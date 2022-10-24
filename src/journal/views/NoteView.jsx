import Swal from "sweetalert2"
import 'sweetalert2/dist/sweetalert2.css'

import { DeleteOutline, SaveOutlined, UploadFileOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { useEffect, useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useForm } from "../../globalhooks/useForm"
import { setActiveNote } from "../../store/journal/journalSlice"
import { startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal/thunks"
import { ImageGallery } from "../components/ImageGallery"

const formValidations = {
    email: [ (value) => value.includes('@'), 'El correo debe tener una @' ],
    password: [ (value) => value.length >= 6, 'El password debe de tener mas de 6 letras.' ],
}

export const NoteView = () => {
    console.log('Desde notas')
    const dispatch = useDispatch()

    const {active: note, messageSaved, isSaving} = useSelector(state => state.journal)
    const {body, title, date, onInputChange, formState} = useForm(note)

    const fileInputRef = useRef()
    
    // console.log('desden')

    const dateString = useMemo(() => {
        const newDate = new Date(date)
        return newDate.toUTCString();
    }, [date])
    

    // Esta es la manera del VIDEO y esta MUY MAL OPTIMIZADA
    // useEffect(() => {
    //     dispatch(setActiveNote(formState))
    // }, [formState])
    
    const onSaveNote = () =>{
        // console.log('hola')
        dispatch(setActiveNote(formState)) // Esta es mi manera mejor optimizada
        dispatch(startSaveNote())
    }

    useEffect(() => {
        if(messageSaved.length > 0) {
            Swal.fire('Nota actualizada', messageSaved, 'success')
        }
    }, [messageSaved])
    

    const onFileInputChange = ({target}) =>{
        if(target.files === 0) return;
        // console.log(target.files)

        // TODO subir archivos
        dispatch(startUploadingFiles(target.files))
    }

    const onDelete = () => {
        console.log('borrado')
        dispatch(startDeletingNote())
    }

  return (
    <Grid container direction='row' justifyContent='space-between' sex={{mb: 1}}>
        <Grid item>
            <Typography fontSize={39} fontWeight='light'>{dateString}</Typography>
        </Grid>

        <Grid item>

            {/* atribute multiple para seleccionar y subir varias a la vez */}
            <input 
                type="file" 
                multiple 
                onChange={onFileInputChange}
                style={{display: 'none'}}
                ref={fileInputRef}
            /> 

            <IconButton
                color='primary'
                disabled={isSaving}
                onClick={() => fileInputRef.current.click()}
            >
                <UploadFileOutlined />
            </IconButton>

            <Button 
                disabled={isSaving}
                onClick={onSaveNote}
                color="primary" 
                sx={{padding: 2}}
            >
                <SaveOutlined sx={{fontSize: 30, mr: 1}} />
                Guardar
            </Button>
        </Grid>

        <Grid container>
            <TextField 
                type='text'
                variant='filled'
                fullWidth
                placeholder="Ingrese un titulo"
                label='Titulo'
                sx={{
                    border: 'none',
                    mb: 1
                }}
                name='title'
                value={title}
                onChange={onInputChange}
            />

            <TextField 
                type='text'
                variant='filled'
                fullWidth
                multiline
                placeholder="Que sucedio el dia de hoy?"
                minRows={5}
                name='body'
                value={body}
                onChange={onInputChange}
            />
        </Grid>

        <Grid container justifyContent='end'>
                <Button
                    disabled={isSaving}
                    onClick={onDelete}
                    sx={{mt: 2}}
                    color='error'
                >
                    <DeleteOutline />
                    Borrar
                </Button>
        </Grid>


        {/* Image gallery */}
        <ImageGallery images={note.imageUrls} />

    </Grid>
  )
}
