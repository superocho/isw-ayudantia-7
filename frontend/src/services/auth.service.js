import api from './api';

export const authService = {
  // Iniciar sesión con email y password
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  // Registrar un nuevo usuario (name, email, password)
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // Obtener perfil del usuario autenticado usando el token actual
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
};

export default authService;
