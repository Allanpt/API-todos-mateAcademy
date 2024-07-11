import { Request, Response } from 'express';

const todoService = require('../services/todo.service');

const getTodos = async (req: Request, res: Response) => {
  const { userId, completed } = req.query;
  const urlParams = {
    userId: String(userId),
    completed: String(completed),
  };
  const todos = await todoService.getTodos(urlParams);

  if (!todos) {
    return res.status(404).json({ message: 'NOT FOUND' });
  }

  return res.status(200).json(todos);
};

const getTodoById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const findTodo = await todoService.getTodoById(Number(id));

  if (!findTodo) {
    return res.status(404).json({ message: 'ToDo not found' });
  }

  return res.status(200).json(findTodo);
};

const createTodo = async (req: Request, res: Response) => {
  const newTodo = await todoService.createTodo(req.body);

  if (!newTodo) {
    return res.status(404).json({
      message: "'userId','title', and 'completed' content MUST BE filled",
    });
  }

  return res.status(201).json(newTodo);
};

const updateTodo = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const update = await todoService.updateTodo(req.body, Number(id));

    if(!update) {
      return res.status(400).json({ message: `Payload (Request Body) should only contain 'completed' property.` });
    }

    return res.status(200).json(update);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }

};

const deleteTodo = async (req: Request, res: Response) => {
  const { id } = req.params;

  const findToDo = await todoService.deleteTodo(Number(id));

  if (!findToDo) {
    return res.status(404).json({ message: 'ToDo not found' });
  }
  return res.status(200).json(1);
};

module.exports = {
  getTodos,
  createTodo,
  getTodoById,
  deleteTodo,
  updateTodo,
};
