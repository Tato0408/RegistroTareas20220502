import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function ProtectedRoute({ children }) {
    const { user, loading } = useAuth();
     console.log("PROTECTED →", { user, loading });
    if (loading) return null;

    if (!user) return <Navigate to="/login" replace />; // ← ahora sí existe la ruta

    return children;
}