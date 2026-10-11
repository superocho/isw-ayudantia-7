import { z } from 'zod';

// Esquema para crear una tarea (POST /api/tasks)
export const createTaskSchema = z.object({
  title: z
    .string({ required_error: 'El título es obligatorio' })
    .trim()
    .min(3, 'El título debe tener al menos 3 caracteres')
    .max(150, 'El título no puede superar los 150 caracteres'),
  description: z
    .string()
    .trim()
    .max(500, 'La descripción no puede superar los 500 caracteres')
    .optional()
});

// Esquema para actualizar una tarea (PUT /api/tasks/:id)
export const updateTaskSchema = createTaskSchema
  .partial()
  .extend({
    completed: z.boolean().optional()
  });

// Esquema para validar el parámetro :id en la URL
export const taskIdParamSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, 'El ID debe ser un número entero')
    .transform(Number)
});
