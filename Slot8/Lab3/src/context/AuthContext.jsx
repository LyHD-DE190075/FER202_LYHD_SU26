import { createContext, useReducer } from 'react';

const initialState = { 
    isAuthenticated: false, 
    user: null, 
    error: null 
};

export const AuthContext = createContext();

function authReducer(state, action) {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return { 
                ...state, 
                isAuthenticated: true, 
                user: action.payload, 
                error: null 
            };
        case 'LOGIN_FAILURE':
            return { 
                ...state, 
                isAuthenticated: false, 
                error: action.payload 
            };
        case 'LOGOUT':
            return initialState;
        default:
            return state;
    }
}

export function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(authReducer, initialState);

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}