import { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/auth.service';

// Contexto global para compartir la sesión del usuario
const AuthContext = createContext(null);

// Hook personalizado para acceder fácilmente a la sesión desde cualquier componente
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
  }
  return context;
};

// Proveedor que envuelve la aplicación y gestiona el estado de autenticación
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Al cargar la aplicación, verifica si ya existe un token guardado en el navegador
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const userData = await authService.getProfile();
        setUser(userData);
      } catch (error) {
        console.error('Error al restaurar sesión:', error);
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Iniciar sesión y guardar el token
  const login = async (credentials) => {
    const data = await authService.login(credentials);
    localStorage.setItem('token', data.token);
    setUser(data.user);
    return data.user;
  };

  // Registrar un nuevo usuario
  const register = async (userData) => {
    const newUser = await authService.register(userData);
    return newUser;
  };

  // Cerrar sesión y limpiar el almacenamiento
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    loading,
    isAuthenticated: Boolean(user),
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
