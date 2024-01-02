import express from 'express';
const Router = express.Router();
import asyncHandler from '../middlewares/asyncHandler.middleware.js';
import {protectUser} from '../middlewares/auth.middleware.js';
import * as todoController from '../controllers/todo.controller.js'

Router.post('/create', asyncHandler(protectUser), asyncHandler(todoController.createTodo));
Router.get('/all', asyncHandler(protectUser), asyncHandler(todoController.getAllTodo));
Router.route('/:id')
.get(asyncHandler(protectUser), asyncHandler(todoController.getParticularTodo))
.put(asyncHandler(protectUser), todoController.editParticularTodo)
.delete(asyncHandler(protectUser), todoController.deleteParticularTodo);

export default Router;