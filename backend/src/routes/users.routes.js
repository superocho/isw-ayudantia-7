import { Router } from 'express';
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/users.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import {
  createUserSchema,
  updateUserSchema,
  userIdParamSchema
} from '../schemas/user.schema.js';

const router = Router();

// Endpoints del recurso usuarios
router.get('/', getUsers);
router.get('/:id', validate(userIdParamSchema, 'params'), getUser);
router.post('/', validate(createUserSchema), createUser);
router.put('/:id', validate(userIdParamSchema, 'params'), validate(updateUserSchema), updateUser);
router.delete('/:id', validate(userIdParamSchema, 'params'), deleteUser);

export default router;
