import { configureStore } from "@reduxjs/toolkit"
import { fireEvent, render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { MemoryRouter } from "react-router-dom"

import { LoginPage } from "../../../src/auth/pages/LoginPage"
import { authSlice } from "../../../src/store/auth"
import { notAuthenticatedState } from "../../fixture/authFixtures"

const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => ({
    startGoogleSignIn: () => mockStartGoogleSignIn,
    startLoginWithEmailAndPassword: ({ email, password }) => {
        return () => mockStartLoginWithEmailPassword({ email, password });
    },
}));

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => (fn) => fn(),
}));

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    preloadedState: {
        auth: notAuthenticatedState
    }
});

describe('Pruebas en el <LoginPage />', () => {
    
    beforeEach(() => jest.clearAllMocks() );

    test('debe mostrar el componente correctamente', () => { 
        render(
            <Provider store={ store } >
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );
        // screen.debug()
        expect( screen.getAllByText('Login').length ).toBeGreaterThanOrEqual(1);

    });

    test('boton de google debe llamar el startGoogleSignIn', () => { 
        render(
            <Provider store={ store } >
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );
        const googleBtn = screen.getByLabelText('google-btn');
        fireEvent.click( googleBtn );
        // screen.debug()
        expect( mockStartGoogleSignIn).toHaveBeenCalled();

    });

    test('submit debe llamar el startLoginWithEmailPassword', () => {
        const email = 'test@test.com';
        const password = '123456';
        render(
            <Provider store={ store } >
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        const emailField = screen.getByRole('textbox', { name: 'Correo' });
        fireEvent.change( emailField, { target: { name: 'email', value: email } });

        const passwordField = screen.getByTestId('password');
        fireEvent.change( passwordField, { target: { name: 'password', value: password } });

        const loginForm = screen.getByLabelText('submit-form');
        fireEvent.submit( loginForm );

        // screen.debug()
        expect( mockStartLoginWithEmailPassword).toHaveBeenCalledWith({
            email: email,
            password: password
        });

    });
 });