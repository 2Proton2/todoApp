import express from 'express';
const Router = express.Router();
import asyncHandler from '../middlewares/asyncHandler.middleware.js';
import {protectUser} from '../middlewares/auth.middleware.js';
import { getTheTodo } from '../middlewares/todoView.js';
import * as todoController from '../controllers/todo.controller.js'

Router.post('/create', asyncHandler(protectUser), asyncHandler(todoController.createTodo));
Router.get('/all', asyncHandler(protectUser), asyncHandler(todoController.getAllTodo));
Router.route('/:id')
.get(asyncHandler(protectUser), asyncHandler(getTheTodo), asyncHandler(todoController.getParticularTodo))
.put(asyncHandler(protectUser), asyncHandler(getTheTodo), todoController.editParticularTodo)
.delete(asyncHandler(protectUser), asyncHandler(getTheTodo), todoController.deleteParticularTodo);

export default Router;