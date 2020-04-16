const { Router } = require('express');
const TodoController = require('./controllers/todoControl');
const CategoryController = require('./controllers/categoryController');

const routes = Router();

//tasks routes
routes.post('/task/newTodo', TodoController.store);
routes.get('/task/index', TodoController.index);
routes.delete('/task/delete', TodoController.destroy);
routes.post('/task/edit', TodoController.edit);
routes.post('/task/find', TodoController.search);

//Categories routes
routes.post('/cat/newTodo', CategoryController.store);
routes.get('/cat/index', CategoryController.index);
routes.delete('/cat/delete', CategoryController.destroy);
routes.post('/cat/edit', CategoryController.edit);

module.exports = routes;