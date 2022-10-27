import { loginWithEmailAndPassword, logoutFirebase, registerUserWIthEMailPassword, signInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout, startCreatingUserWithEmailAndPassword, startGoogleSignIn, startLoginWithEmailAndPassword, startLogout } from "../../../src/store/auth";
import { checkingAuthentication } from "../../../src/store/auth/thunks"
import { clearNotesLogout } from "../../../src/store/journal";
import { demoUser } from "../../fixture/authFixtures";

jest.mock('../../../src/firebase/providers');


describe('Prubeas sobre AuthThunks', () => {
    const dispatch = jest.fn();

    beforeEach( () => jest.clearAllMocks() );


    test('debe invocar el checkingCredentials', async() => {
        await checkingAuthentication()( dispatch );
        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
    });

    test('startGoogleSignIn debe invocar checkingCredentials y login - Exito', async() => {
        
        const loginData = { ok: true, ...demoUser };
        await signInWithGoogle.mockResolvedValue( loginData );

        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login( loginData ) );
    });

    test('startGoogleSignIn debe invocar checkingCredentials y logout - Error', async() => {
        
        const loginData = { ok: false, "errorMessage": "No se encuentra el usuario" };
        await signInWithGoogle.mockResolvedValue( loginData );

        await startGoogleSignIn()( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) );
    });

     
    test('startLoginWithEmailAndPassword debe invocar el checkingCredentials y login - Exito', async() => {
        const formData = { email: 'demo@google.com', password: 'asd123' };
        const loginData = { ok: true, ...demoUser };

        await loginWithEmailAndPassword.mockResolvedValue( loginData );

        await startLoginWithEmailAndPassword( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login({ ...demoUser }) );
    });


    test('startLoginWithEmailAndPassword debe invocar el checkingCredentials y login - Error', async() => {
        
        const loginData = { ok: false, "errorMessage": "No se encuentra el usuario" };
        const formData = { email: 'demo@google.com', password: 'asd123' };
        await loginWithEmailAndPassword.mockResolvedValue( loginData );

        await startLoginWithEmailAndPassword( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) );
    });

         
    test('startCreatingUserWithEmailAndPassword debe invocar el checkingCredentials y login - Exito', async() => {
        const formData = { email: 'demo@google.com', password: 'asd123', displayName: 'Demo User' };
        const loginData = { ok: true, ...demoUser };

        await registerUserWIthEMailPassword.mockResolvedValue( loginData );

        await startCreatingUserWithEmailAndPassword( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( login({ ...demoUser }) );
    });

    test('startCreatingUserWithEmailAndPassword debe invocar el checkingCredentials y login - Error', async() => {
        
        const loginData = { ok: false, "errorMessage": "No se encuentra el usuario" };
        const formData = { email: 'demo@google.com', password: 'asd123', displayName: 'Demo User' };
        await registerUserWIthEMailPassword.mockResolvedValue( loginData );

        await startCreatingUserWithEmailAndPassword( formData )( dispatch );

        expect( dispatch ).toHaveBeenCalledWith( checkingCredentials() );
        expect( dispatch ).toHaveBeenCalledWith( logout( loginData.errorMessage ) );
    });

    test('startLogout debe invocar logoutFirebase, clearNotes y logout', async() => {
        await startLogout()( dispatch );
        expect( logoutFirebase ).toHaveBeenCalled();
        expect( dispatch ).toHaveBeenCalledWith( clearNotesLogout() );
        expect( dispatch ).toHaveBeenCalledWith( logout() );
    });
 });