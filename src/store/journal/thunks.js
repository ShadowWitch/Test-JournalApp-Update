import {collection, deleteDoc, doc, setDoc} from 'firebase/firestore/lite'
import { FirebaseDB } from '../../firebase/config';
import { fileUpload } from '../../helpers/fileUpload';
import { LoadNotes } from '../../helpers/loadNotes';
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from './journalSlice';

export const startNewNote = () => {
    return async ( dispatch, getState ) => {

        dispatch(savingNewNote())
        
        // console.log(getState())
        const {uid} = getState().auth;

        // uid
        const newNote = {
            ids: '',
            title: '',
            body: '',
            date: new Date().getTime(),
            imageUrls: []
        }

        const newDoc = doc( collection(FirebaseDB, `${uid}/journal/notas`) )
        newNote.ids = newDoc.id;
        const setDocResp = await setDoc(newDoc, newNote) // Si todo sale bien esto dara "undefined", e insertara la nota

        // console.log({newDoc, setDocResp})
        dispatch(addNewEmptyNote(newNote))
        dispatch(setActiveNote(newNote))

        // dispatch
        // dispatch(newNote)
        // dispatch(activarNota)
    }
}

export const startLoadingNotes = () => {

    return async(dispatch, getState) =>{
        const {uid} = getState().auth;

        if(!uid) throw Error('El uid no existe') // Esto nunca sucedera... Pero por si acaso

        const notes = await LoadNotes(uid);

        // console.log('>>notes ', notes)
        dispatch(setNotes(notes))

    }
}

export const startSaveNote = () => {
    return async (dispatch, getState) =>{
        dispatch(setSaving())

        const {uid} = getState().auth;
        const {active: note} = getState().journal;

        const noteToFireStore = {...note}
        delete noteToFireStore.ids; // Eliminar el "ids" del note

        // console.log(' >> ', noteToFireStore)
        const docRef = doc(FirebaseDB, `${uid}/journal/notas/${note.ids}`) // Referencia al documento de Firebase
        await setDoc(docRef, noteToFireStore, {merge: true}) // "merge: true" Lo que hace es que en caso de que mandemos "campos" que no existian alla, pues que me los una igual y los demas se mantengan (asi como hacer merge en git)

        dispatch(updateNote(note))

    }
}


export const startUploadingFiles = (files = []) =>{

    return async (dispatch, getState) => {
        dispatch(setSaving())

        // Puedo subirlas usando un "forEach" y llamar la funcion en cada iteracion, pero eso solo las subiria de "una en una" de forma secuencial y yo lo que quiero es subirlas todas de una sola vez (simultaneamente).
        // await fileUpload(files[0])

        // fileUpload()
        // console.log('>> ', files)

        const fileUploadPromises = []
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file))
        }

        const photosUrls = await Promise.all(fileUploadPromises) // Cuando todo lo de "fileUploadPromises" (osea todas las peticiones) se resuelve entonces, en "photosUrls" se me almacenara un arrelo con cada una de las resoluciones de esas promesas "EN EL MISMO ORDEN" (aunque no siempre es asi ya lo probe)...

        dispatch(setPhotosToActiveNote(photosUrls))


    }
}

export const startDeletingNote = () => {

    return async(dispatch, getState) => {
        dispatch(setSaving())

        const {uid} = getState().auth;
        const {active: note} = getState().journal;
        const docRef = doc(FirebaseDB, `${uid}/journal/notas/${note.ids}`)

        const respDelete = await deleteDoc(docRef) // Si se elimina bien devolvera "undefined"

        // console.log(respDelete)

        // Borrarlo del Local tambien
        dispatch(deleteNoteById(note.ids))


    }

}