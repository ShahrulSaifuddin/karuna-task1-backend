import { Router } from 'express';

import {
  createTodo,
  editTodo,
  deleteTodo,
  updateTodo,
} from '../controllers/todoController.js';
import {
  validateTodoInput,
  validateIdParam,
  validateOwner,
} from '../middleware/validationMiddleware.js';

const router = Router();
// router.route('/').get(getAllTasks).post(validateTaskInput, createTodo);
router
  .route('/')
  .post(validateTodoInput, createTodo)
  .patch(updateTodo)
  .delete(deleteTodo);

router
  .route('/:id')
  .patch(validateTodoInput, validateIdParam, validateOwner, editTodo);

export default router;
