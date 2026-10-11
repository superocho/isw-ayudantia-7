import api from './api';

export const tasksService = {
  // Obtener todas las tareas del usuario
  getAll: async () => {
    const response = await api.get('/tasks');
    return response.data;
  },

  // Obtener una tarea por ID
  getById: async (id) => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  // Crear una nueva tarea
  create: async (taskData) => {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },

  // Actualizar una tarea existente
  update: async (id, taskData) => {
    const response = await api.put(`/tasks/${id}`, taskData);
    return response.data;
  },

  // Eliminar una tarea por ID
  delete: async (id) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },
};

export default tasksService;
