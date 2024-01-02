import express from 'express';
import asyncHandler from '../middlewares/asyncHandler.middleware.js'
import * as userController from '../controllers/user.controller.js'
const Router = express.Router();

Router.post('/sign-in', asyncHandler(userController.signUser));
Router.post('/login', asyncHandler(userController.loginUser));
Router.post('/logout', asyncHandler(userController.logoutUser));
Router.get('/', asyncHandler(userController.profileOfUser));

export default Router;