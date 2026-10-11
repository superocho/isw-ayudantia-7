import { z } from 'zod';

// Esquema para crear un usuario (POST /api/users)
export const createUserSchema = z.object({
  name: z
    .string({ required_error: 'El nombre es obligatorio' })
    .trim()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede superar los 100 caracteres'),
  email: z
    .string({ required_error: 'El correo electrónico es obligatorio' })
    .trim()
    .email('Debe ingresar un correo electrónico válido')
    .toLowerCase()
});

// Esquema para actualizar un usuario (PUT /api/users/:id)
export const updateUserSchema = createUserSchema.partial();

// Esquema para validar el parámetro :id en la URL
export const userIdParamSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, 'El ID debe ser un número entero')
    .transform(Number)
});
