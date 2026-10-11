import * as usersService from '../services/users.service.js';

// GET /api/users - Listar todos los usuarios
export const getUsers = async (req, res, next) => {
  try {
    const users = await usersService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// GET /api/users/:id - Obtener un usuario por ID con sus tareas
export const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await usersService.getUserById(id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// POST /api/users - Crear un nuevo usuario
export const createUser = async (req, res, next) => {
  try {
    const newUser = await usersService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

// PUT /api/users/:id - Actualizar datos de un usuario
export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedUser = await usersService.updateUser(id, req.body);
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/users/:id - Eliminar un usuario
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await usersService.deleteUser(id);
    res.status(200).json({ message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    next(error);
  }
};
