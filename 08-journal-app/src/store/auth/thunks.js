import { signInWithGoogle, registerUserWIthEMailPassword, loginWithEmailAndPassword, logoutFirebase } from '../../firebase/providers';
import { clearNotesLogout } from '../journal';
import { checkingCredentials, logout, login } from './';

export const checkingAuthentication = ( email, password ) => {
    // Esta funcion devuelve un callback asincrono.
    return async( dispatch ) => {

        dispatch( checkingCredentials() );        
    }
}


export const startGoogleSignIn = ( email, password ) => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );
        const result = await signInWithGoogle();
        
        if ( !result.ok ) dispatch( logout( result.errorMessage ) );
        if ( result.ok ) dispatch( login( result ) );        
    }
}

export const startCreatingUserWithEmailAndPassword = ({ email, password, displayName }) => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );
        const { ok, uid, photoURL, errorMessage } = await registerUserWIthEMailPassword({ email, password, displayName });
        if ( !ok ) dispatch( logout( errorMessage ) );
        if ( ok ) dispatch( login({ uid, photoURL, email, displayName}) );      
    }
}

export const startLoginWithEmailAndPassword = ({ email, password }) => {
    return async( dispatch ) => {

        dispatch( checkingCredentials() );
        const { ok, uid, photoURL, errorMessage, displayName } = await loginWithEmailAndPassword({ email, password });
        if ( !ok ) dispatch( logout( errorMessage ) );
        if ( ok ) dispatch( login({ uid, photoURL, email, displayName}) );
    }
}

export const startLogout = () => {
    return async( dispatch ) => {
        await logoutFirebase();
        dispatch( clearNotesLogout() );

        dispatch( logout() );
    }
}