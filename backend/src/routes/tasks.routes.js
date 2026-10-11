import { Router } from 'express';
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
} from '../controllers/tasks.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { authenticateToken } from '../middlewares/auth.middleware.js';
import {
  createTaskSchema,
  updateTaskSchema,
  taskIdParamSchema
} from '../schemas/task.schema.js';

const router = Router();

// Proteger todas las rutas de tareas (requiere sesión activa con JWT)
router.use(authenticateToken);

// Endpoints del recurso tareas
router.get('/', getTasks);
router.get('/:id', validate(taskIdParamSchema, 'params'), getTask);
router.post('/', validate(createTaskSchema), createTask);
router.put('/:id', validate(taskIdParamSchema, 'params'), validate(updateTaskSchema), updateTask);
router.delete('/:id', validate(taskIdParamSchema, 'params'), deleteTask);

export default router;
