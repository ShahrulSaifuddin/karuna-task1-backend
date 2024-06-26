import { Router } from 'express';

import {
  createTodo,
  editTodo,
  deleteTodo,
  updateTodo,
  getAllTodos,
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
  .get(getAllTodos)
  .post(validateTodoInput, createTodo)
  .patch(updateTodo);

router
  .route('/:id')
  .patch(validateTodoInput, validateIdParam, validateOwner, editTodo)
  .delete(deleteTodo);

export default router;
