
import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null,
        // active: {
        //     id: 'ABC123',
        //     title: '',
        //     body: '',
        //     date: 1234567,
        //     imageUrls: [], // https://hola.jpg, https://queso.png ...
        // }
    },
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action) =>{
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote: (state, action) =>{
            // console.log('>> ', action)
            state.active = action.payload
            state.messageSaved = '';
        },
        setNotes: (state, action) =>{
            // De ambas maneras funciona
            state.notes = action.payload
            // state.notes.push(...action.payload)
        },
        setSaving: (state) =>{
            state.isSaving = true;
            state.messageSaved = '';
        },
        updateNote: (state, action) =>{
            state.isSaving = false
            state.notes = state.notes.map(note => {
                if(note.ids === action.payload.ids){
                    return action.payload
                }
                return note;
            });
            state.messageSaved = `${action.payload.title}, actualizado!`
        },
        deleteNoteById: (state, action) =>{
            console.log(action.payload)
            state.notes = state.notes.filter(note => note.ids !== action.payload)
            // Esto es por mi cuenta
            state.active = null
            state.isSaving = false
        },
        setPhotosToActiveNote: (state, action) =>{
            // state.active.imageUrls = [...state.active.imageUrls, ...action.payload]
            state.active.imageUrls.push(...action.payload)
            state.isSaving = false
        },
        clearNotesLogout: (state) => {
            console.log('queso')
            state.isSaving = false
            state.messageSaved = ''
            state.notes = []
            state.active = null
        }
    }
});

export const { 
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNoteById,
    savingNewNote,
    setPhotosToActiveNote,
    clearNotesLogout,
} = journalSlice.actions;