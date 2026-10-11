import * as tasksService from '../services/tasks.service.js';

// GET /api/tasks - Obtener listado de tareas del usuario autenticado
export const getTasks = async (req, res, next) => {
  try {
    const tasks = await tasksService.getAllTasks(req.user.id);
    res.status(200).json(tasks);
  } catch (error) {
    next(error);
  }
};

// GET /api/tasks/:id - Obtener una tarea por ID del usuario autenticado
export const getTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await tasksService.getTaskById(id, req.user.id);
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

// POST /api/tasks - Crear una nueva tarea asignada al usuario logueado
export const createTask = async (req, res, next) => {
  try {
    const newTask = await tasksService.createTask({
      ...req.body,
      userId: req.user.id
    });
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

// PUT /api/tasks/:id - Actualizar una tarea del usuario autenticado
export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedTask = await tasksService.updateTask(id, req.user.id, req.body);
    res.status(200).json(updatedTask);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/tasks/:id - Eliminar una tarea del usuario autenticado
export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    await tasksService.deleteTask(id, req.user.id);
    res.status(200).json({ message: 'Tarea eliminada exitosamente' });
  } catch (error) {
    next(error);
  }
};
