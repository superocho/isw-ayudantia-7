import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma.js';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// Registra un nuevo usuario con contraseña hasheada
export const register = async ({ name, email, password }) => {
  // Genera el hash seguro con 10 rondas de sal
  const hashedPassword = await bcrypt.hash(password, 10);

  // Guarda el usuario en la base de datos
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  });

  // Excluye la contraseña del objeto retornado
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

// Autentica las credenciales y genera el token JWT
export const login = async ({ email, password }) => {
  // Busca al usuario por su correo
  const user = await prisma.user.findUnique({
    where: { email }
  });

  if (!user) {
    const error = new Error('Credenciales inválidas');
    error.status = 401;
    throw error;
  }

  // Compara la contraseña enviada con el hash almacenado
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    const error = new Error('Credenciales inválidas');
    error.status = 401;
    throw error;
  }

  // Genera y firma el token JWT
  const token = jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );

  // Excluye la contraseña del objeto retornado
  const { password: _, ...userWithoutPassword } = user;

  return {
    user: userWithoutPassword,
    token
  };
};

// Obtiene los datos del perfil del usuario autenticado a partir de su ID
export const getProfile = async (userId) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: Number(userId) }
  });

  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};
