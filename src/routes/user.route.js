import express from 'express';
import {protectUser} from '../middlewares/auth.middleware.js';
import asyncHandler from '../middlewares/asyncHandler.middleware.js'
import * as userController from '../controllers/user.controller.js'
const Router = express.Router();

/**
 * @openapi
 * /api/user/sign-in:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       description: User registration data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password
 *     responses:
 *       '200':
 *         description: Successful registration
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *               _id:
 *                   type: string
 *                   description: Unique identifier generated by MongoDB
 *              email:
 *                   type: string
 *                   format: email
 *                   description: User's email address
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
Router.post('/sign-in', asyncHandler(userController.signUser));

/**
 * @openapi
 * /api/user/login:
 *   post:
 *     summary: User Login
 *     tags: [Users]
 *     requestBody:
 *       description: Login details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password
 *     responses:
 *       '200':
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *               data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: Unique identifier generated by MongoDB
 *                     email:
 *                       type: string
 *                       format: email
 *                       description: User's email address
 *              message:
 *                  type: string
 *                  description: Login successful message
 *       '400':
 *         description: Bad request
 *       '500':
 *         description: Internal server error
 */
Router.post('/login', asyncHandler(userController.loginUser));

/**
 * @openapi
 * /api/user/logout:
 *   post:
 *     summary: User Logout
 *     tags: [Users]
 *     security:
 *          - jwt: []
 *     responses:
 *       '200':
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *               message:
 *                   type: string
 *                   description: Logout successful message
 *       '400':
 *         description: Unauthorized - Invalid or expired JWT token
 *       '500':
 *         description: Internal server error
 */
Router.post('/logout', asyncHandler(protectUser), asyncHandler(userController.logoutUser));

/**
 * @openapi
 * /api/user/:
 *   get:
 *     summary: User Profile
 *     tags: [Users]
 *     security:
 *          - jwt: []
 *     responses:
 *       '200':
 *         description: Fetched user profile details successfully
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *               data:
 *                  type: object
 *                  properties:
 *                      _id:
 *                          type: string
 *                          description: Unique identifier generated by MongoDB
 *                      email:  
 *                          type: string
 *                      password:
 *                           type: string
 *                      createdAt:
 *                            type: string
 *                            format: date-time
 *                      updatedAt:
 *                            type: string
 *                            format: date-time
 *                      __v:
 *                            type: integer
 *               message:
 *                   type: string
 *                   description: Logout successful message
 *       '400':
 *         description: Unauthorized - Invalid or expired JWT token
 *       '500':
 *         description: Internal server error
 */
Router.get('/', asyncHandler(protectUser), asyncHandler(userController.profileOfUser));

export default Router;