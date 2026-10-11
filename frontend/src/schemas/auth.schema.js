import { z } from 'zod';

// Esquema de validación para inicio de sesión
export const loginSchema = z.object({
  email: z
    .string({ required_error: 'El correo electrónico es obligatorio' })
    .trim()
    .email('Debe ingresar un correo electrónico válido')
    .toLowerCase(),
  password: z
    .string({ required_error: 'La contraseña es obligatoria' })
    .min(1, 'La contraseña no puede estar vacía'),
});

// Esquema de validación para registro de nueva cuenta
export const registerSchema = z.object({
  name: z
    .string({ required_error: 'El nombre es obligatorio' })
    .trim()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede superar los 100 caracteres'),
  email: z
    .string({ required_error: 'El correo electrónico es obligatorio' })
    .trim()
    .email('Debe ingresar un correo electrónico válido')
    .toLowerCase(),
  password: z
    .string({ required_error: 'La contraseña es obligatoria' })
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .max(100, 'La contraseña no puede superar los 100 caracteres'),
});
