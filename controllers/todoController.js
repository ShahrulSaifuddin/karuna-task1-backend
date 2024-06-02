import Todo from '../models/TodoModel.js';
import User from '../models/UserModel.js';
import { StatusCodes } from 'http-status-codes';

// #region Create Todo
export const createTodo = async (req, res) => {
  console.log('BODY', req);

  try {
    const todo = await Todo.create({
      ...req.body,
      createdBy: req.user.userId,
    });
    console.log('Todo', todo);

    res.status(StatusCodes.CREATED).json({ todo });
  } catch (error) {
    console.error('Error creating checklist:', error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Failed to create checklist' });
  }
};
// #endregion

// #region Update Todo
export const updateTodo = async (req, res) => {
  console.log('BODY update', req);

  try {
    const todo = await Todo.findById(req.body.id);
    console.log('todo', todo);
    if (!todo) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'todo not found' });
    }

    todo.completed = !todo.completed;

    await todo.save();

    res.status(StatusCodes.CREATED).json({ todo });
  } catch (error) {
    console.error('Error updating todo:', error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Failed to update todo' });
  }
};
// #endregion

// #region Delete Todo
export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    res.status(StatusCodes.CREATED).json({ todo });
  } catch (error) {
    console.error('Error deleting checklist:', error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Failed to delete checklist' });
  }
};
// #endregion

// #region Edit Task checklist
export const editTodo = async (req, res) => {
  console.log('BODY update', req);

  try {
    const todo = await Todo.findById(req.params.id);
    console.log('todo', todo);
    if (!todo) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'todo not found' });
    }

    todo.title = req.body.title;

    await todo.save();

    res.status(StatusCodes.CREATED).json({ todo });
  } catch (error) {
    console.error('Error updating todo:', error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Failed to update todo' });
  }
};
// #endregion

// #region Get Todo
export const getAllTodos = async (req, res) => {
  console.log('BODY', req.user);

  try {
    const todo = await Todo.find({ createdBy: req.user.userId });
    console.log('Todo', todo);

    res.status(StatusCodes.CREATED).json({ todo });
  } catch (error) {
    console.error('Error creating checklist:', error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Failed to create checklist' });
  }
};
// #endregion
