import prisma from '../config/prisma.js';

// Retorna todos los usuarios registrados
export const getAllUsers = async () => {
  return await prisma.user.findMany({
    orderBy: { createdAt: 'desc' }
  });
};

// Busca un usuario por ID e incluye sus tareas asociadas
export const getUserById = async (id) => {
  return await prisma.user.findUniqueOrThrow({
    where: { id: Number(id) },
    include: {
      tasks: true
    }
  });
};

// Inserta un nuevo usuario en la base de datos
export const createUser = async (userData) => {
  return await prisma.user.create({
    data: userData
  });
};

// Actualiza los datos de un usuario según su ID
export const updateUser = async (id, userData) => {
  return await prisma.user.update({
    where: { id },
    data: userData
  });
};

// Elimina un usuario según su ID
export const deleteUser = async (id) => {
  return await prisma.user.delete({
    where: { id }
  });
};
