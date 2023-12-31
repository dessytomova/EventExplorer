import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as authService from '../services/authService';
import Path from '../paths';
import usePersistedState from "../hooks/usePersistedState";

const AuthContext = createContext();

export const AuthProvider = ({
    children
}) => {

    const navigate = useNavigate();
    const [auth, setAuth] = usePersistedState('auth', {});

    const loginSubmitHandler = async (values) => {
        const result = await authService.login(values.email, values.password);
        setAuth(result);
        localStorage.setItem('accessToken', result.accessToken);
        navigate(Path.MyEvents);
    };

    const registerSubmitHandler = async (values) => {
        const result = await authService.register(values.email, values.password);
        setAuth(result);
        localStorage.setItem('accessToken', result.accessToken);
        navigate(Path.Home);
    };

    const logoutHandler = () => {
        setAuth({});

        localStorage.removeItem('accessToken');
    };

    const value = {
        loginSubmitHandler,
        registerSubmitHandler,
        logoutHandler,
        username: auth.email,
        email: auth.email,
        isAuthenticated: !!auth.email, 
        userId: auth._id
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;