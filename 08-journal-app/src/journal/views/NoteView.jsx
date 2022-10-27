import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { DeleteOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

import { ImageGallery } from '../components';
import { setActiveNote, startDeletingNote, startSavingNote, startUploadingFiles } from '../../store/journal';
import { useForm } from '../../hooks/useForm';

export const NoteView = () => {
    const { active: note, messageSave, isSaving } = useSelector( state => state.journal );

    const dispatch = useDispatch();
    
    const { body, title, date, onInputChange, formState } = useForm( note );

    const dateString = useMemo(() => {
        const fixedDate = new Date( date );
        return fixedDate.toUTCString();
    }, [ date ]);

    const fileInputRef = useRef();

    useEffect(() => {
      dispatch( setActiveNote( formState ) );

    }, [formState]);
    
    useEffect(() => {
        if ( messageSave.length > 0 ){
        Swal.fire('Nota actualizada', messageSave, 'success');
        }
    }, [messageSave])
    
    const onSaveNote = () => {
        dispatch( startSavingNote() );
    }
    

    const onFileInputChange = ({ target }) => {
        if( target.files === 0 ) return;

        dispatch( startUploadingFiles( target.files ) );

        console.log("Subiendo archivos");
    }

    const onDelete = () => {
        dispatch( startDeletingNote() );
    }

  return (
    <Grid
        className='animate__animated animate__fadeIn animate__faster'
        container
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        sx={{ mb: 1 }}
        >
        <Grid item>
            <Typography fontSize={ 39 } fontWeight='light'>{ dateString }</Typography>
        </Grid>
        <Grid item>

            
            <input
                type="file"
                multiple
                ref={ fileInputRef }
                onChange={ onFileInputChange }
                style={{ display: 'none' }}
            />

            <IconButton
                color='primary'
                disabled={ isSaving }
                onClick={ () => fileInputRef.current.click() }
            >
                <UploadOutlined />
            </IconButton>


            <Button
                disabled={ isSaving }
                onClick={ onSaveNote }
                color="primary"
                sx={{ padding: 2 }}

            >
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }}/>
                Guardar
            </Button>
        </Grid>
        <Grid container>
            <TextField
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese un titulo"
                label="Titulo"
                sx={{ border: 'none', mb: 1 }}
                name="title"
                value={ title }
                onChange={ onInputChange }
            />
        </Grid>
        <Grid container>
            <TextField
                type="text"
                variant="filled"
                fullWidth
                multiline
                // placeholder="¿Qué sucedió el día de hoy?"
                label="¿Qué sucedió el día de hoy?"
                minRows={ 5 }
                name="body"
                value={ body }
                onChange={ onInputChange }
            />
        </Grid>

        <Grid container justifyContent='end'>
            <Button
                onClick={ onDelete }
                sx={{ mt: 2 }}
                color="error"
            >
                <DeleteOutline />
                Borrar
            </Button>
        </Grid>

        <ImageGallery
            images={ note.imageUrls }
        />
    </Grid>
  )
}
