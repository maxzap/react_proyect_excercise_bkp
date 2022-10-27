import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
   name: 'journal',
   initialState: {
      isSaving: false,
      messageSave: '',
      notes: [],
      active: null,
    // active: {
    //     id: 'ABC123',
    //     title: '',
    //     body: '',
    //     date: 123456,
    //     imageUrl: [], //https://foto1.jpg, https://foto2.jpg, https://foto3.jpg
    // }
   },
   //Todo lo que va en los reducer tiene que ser si o si sincrono
   reducers: {
        savingNewNote: ( state ) => {
            state.isSaving = true;
        },
        addNewEmptyNote: ( state, action ) => {
            state.notes.push( action.payload );
            state.isSaving = false;

        },
        setActiveNote: ( state, action ) => {
            state.active = action.payload;
            state.messageSave = '';
        },
        setNotes: ( state, action ) => {
            state.notes = action.payload;
        },
        setSaving: ( state ) => {
            state.isSaving = true;
            state.messageSave = '';
        },
        noteUpdated: ( state, action ) => {
            state.isSaving = false;
            state.notes = state.notes.map( note => {
                console.log(note)
                if( note.id == action.payload.id ) {
                    return action.payload;
                }
                return note;
            });

            state.messageSave = `${ action.payload.title } actualizada correctamente`;
        },
        setPhotosToActiveNotes: ( state, action ) => {
            state.active.imageUrls = [ ...state.active.imageUrls, ...action.payload ];
            state.isSaving = false;
        },
        clearNotesLogout: ( state, action ) => {
            state.isSaving = false;
            state.messageSave = '';
            state.notes = [];
            state.active = null;
        },
        deleteNoteById: ( state, action ) => {
            // var removeIndex = state.notes.map(item => item.id).indexOf(action.payload);

            // ~removeIndex && state.notes.splice(removeIndex, 1);
            state.active = null;
            state.notes = state.notes.filter( note => note.id !== action.payload );
        },

   }
});


// Action creators are generated for each case reducer function
export const { 
    savingNewNote,
    addNewEmptyNote, 
    setActiveNote, 
    setNotes, 
    setSaving, 
    noteUpdated,
    setPhotosToActiveNotes,
    deleteNoteById,
    clearNotesLogout,
} = journalSlice.actions;
