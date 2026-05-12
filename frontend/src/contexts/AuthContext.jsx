import { createContext, useContext, useState, useEffect } from 'react';
import * as AuthService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const data = await AuthService.getMe();
                setUser(data);
            } catch (error) {
                // Si /me falla, no hay sesión activa
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (email, password) => {
        try {
            await AuthService.login(email, password);
            const data = await AuthService.getMe();
            setUser(data);
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
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);