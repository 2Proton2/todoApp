import express from 'express';
const Router = express.Router();
import * as todoController from '../controllers/todo.controller.js'

Router.post('/create', todoController.createTodo);
Router.get('/all', todoController.getAllTodo);
Router.route('/:id').get(todoController.getParticularTodo).put(todoController.editParticularTodo).delete(todoController.deleteParticularTodo);

export default Router;