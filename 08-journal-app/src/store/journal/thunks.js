import { addDoc, collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { deleteNoteById, addNewEmptyNote, setActiveNote, savingNewNote , setNotes, setSaving, noteUpdated, setPhotosToActiveNotes } from "./";
import { fileUpload, loadNotes } from "../../helpers";


export const startNewNote = () => {
    return async( dispatch, getState ) => {

        dispatch( savingNewNote() );
        const { uid } = getState().auth;
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imageUrls: [],
        }
        

        try {
            const newDoc = await addDoc( collection( FirebaseDB, `${ uid }/journal/notes`), newNote );
            newNote.id = newDoc.id;
        } catch (e) {
            console.log(e)
            
        }

        dispatch( addNewEmptyNote( newNote ) );
        dispatch( setActiveNote( newNote ) );
        
    }
}

export const startLoadingNotes = () => {
    return async( dispatch, getState ) => {
        
        const { uid } = getState().auth;
        if( !uid ) throw new Error('El UID del usuario no existe');

        const notes = await loadNotes( uid );

        dispatch( setNotes( notes ) );


    }
}

export const startSavingNote = () => {
    return async( dispatch, getState ) => {
        dispatch( setSaving() );
        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        console.log(note.id)

        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }` );
        await setDoc( docRef, noteToFirestore, { merge: true } );
        
        dispatch( noteUpdated( note ) );

    }
}

export const startUploadingFiles = ( files = [] ) => {
    return async( dispatch ) => {
        dispatch( setSaving() );
        // await fileUpload( files[0] );

        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push( fileUpload( file ))
        }

        const photosUrls = await Promise.all( fileUploadPromises );
        console.log(photosUrls);
        dispatch( setPhotosToActiveNotes( photosUrls ) );

    }

}

export const startDeletingNote = () => {
    return async( dispatch, getState ) => {
        const { uid } = getState().auth;
        const { active:note } = getState().journal;
        
        const docRef = doc( FirebaseDB, `/${ uid }/journal/notes/${ note.id }` );
        const response = await deleteDoc( docRef );

        dispatch( deleteNoteById( note.id ) );

    }

}