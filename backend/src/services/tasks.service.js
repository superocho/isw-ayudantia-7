import prisma from '../config/prisma.js';

// Retorna todas las tareas del usuario autenticado
export const getAllTasks = async (userId) => {
  return await prisma.task.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }
  });
};

// Busca una tarea por ID que pertenezca al usuario autenticado
export const getTaskById = async (id, userId) => {
  return await prisma.task.findFirstOrThrow({
    where: {
      id: Number(id),
      userId
    }
  });
};

// Inserta una nueva tarea asociada al usuario autenticado
export const createTask = async (taskData) => {
  return await prisma.task.create({
    data: {
      title: taskData.title,
      description: taskData.description ?? null,
      userId: taskData.userId
    }
  });
};

// Actualiza una tarea asegurando que pertenezca al usuario autenticado
export const updateTask = async (id, userId, taskData) => {
  await getTaskById(id, userId);

  return await prisma.task.update({
    where: { id: Number(id) },
    data: taskData
  });
};

// Elimina una tarea asegurando que pertenezca al usuario autenticado
export const deleteTask = async (id, userId) => {
  await getTaskById(id, userId);

  return await prisma.task.delete({
    where: { id: Number(id) }
  });
};
