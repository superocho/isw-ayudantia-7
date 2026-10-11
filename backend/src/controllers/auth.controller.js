import * as authService from '../services/auth.service.js';

// POST /api/auth/register - Registrar nuevo usuario
export const register = async (req, res, next) => {
  try {
    const newUser = await authService.register(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/login - Iniciar sesión
export const login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// GET /api/auth/profile - Obtener datos del usuario logueado
export const getProfile = async (req, res, next) => {
  try {
    const user = await authService.getProfile(req.user.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
