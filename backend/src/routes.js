const { Router } = require('express');
const TodoController = require('./controllers/todoControl');
const CategoryController = require('./controllers/categoryController');

const routes = Router();

//tasks routes
//New Task
routes.post('/task/newTodo', TodoController.store);
//get all tasks
routes.get('/task/index', TodoController.index);
//Delete Task
routes.post('/task/delete', TodoController.destroy);
//Edit Task
routes.post('/task/edit', TodoController.edit);
//Find specific task
routes.post('/task/find', TodoController.search);

//Categories routes
//New Category
routes.post('/cat/newCat', CategoryController.store);
//get all Categories
routes.get('/cat/index', CategoryController.index);
//Delete Category
routes.post('/cat/delete', CategoryController.destroy);
//Edit Category
routes.post('/cat/edit', CategoryController.edit);

module.exports = routes;