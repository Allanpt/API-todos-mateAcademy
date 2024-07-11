const express = require('express');
const todoController = require('../controllers/todo.controller');
const todoRoute = express.Router();
todoRoute.get('/', todoController.getTodos);
todoRoute.get('/:id', todoController.getTodoById);
todoRoute.post('/', todoController.createTodo);
todoRoute.patch('/:id', todoController.updateTodo);
todoRoute.delete('/:id', todoController.deleteTodo);
module.exports = { todoRoute };
