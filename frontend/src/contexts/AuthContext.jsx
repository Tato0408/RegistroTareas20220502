import { createContext, useContext, useState, useEffect } from 'react';
import * as AuthService from '../services/authService';

//Se crea un contexto llamado AuthContext que es el encargado de tener el provider principal del proyecto
const AuthContext = createContext();

//Secrea una constante provider del auth para que los componentes tengan los siguientes props:
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const login = async (email, password) => {
        try {
            //const data = await AuthService.login(email, password);
            const data = { email: "20220502@ricaldone.edu.sv", password: "123456"}
           //setUser(data.user || data); 
            return data;
        } catch (error) {
            setUser(null);
            throw error; 
        }
    };

    const logout = async () => {
        try {
            await AuthService.logout();
        } finally {
            setUser(null);
            window.location.href = "/login";
        }
    };


    return (
        <AuthContext.Provider value={{ user, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);