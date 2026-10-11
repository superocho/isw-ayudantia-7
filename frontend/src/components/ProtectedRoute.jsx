import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Componente protector: solo permite el paso a usuarios autenticados
export function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  // Mientras verifica el token en localStorage, muestra un estado de espera
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <p className="text-slate-400 text-base animate-pulse">
          Verificando sesión...
        </p>
      </div>
    );
  }

  // Si no está autenticado, redirige al Login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, muestra la página protegida
  return children;
}

export default ProtectedRoute;
