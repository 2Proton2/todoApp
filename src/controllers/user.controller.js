import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import moment from "moment-timezone";
import genToken from "../utilities/gentoken.js";

/**
 * API POST '/sign-in'
 * @param {*} req 
 * @param {*} res 
 */
export const signUser = async (req, res) => {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        throw new Error(`User already exists`);
    }

    const userInstance = await User.create({ email, password });

    if (userInstance) {
        genToken(res, userInstance._id);
        res.status(201).json({
            data: {
                _id: userInstance._id,
                email: userInstance.email
            },
            message: 'signed in'
        });
    }
    else{
        throw new Error(`Error while registering the user`);
    }
}

/**
 * API POST '/login'
 * @param {*} req 
 * @param {*} res 
 */
export const loginUser = async (req, res) => {
}

/**
 * API POST '/logout'
 * @param {*} req 
 * @param {*} res 
 */
export const logoutUser = async (req, res) => {
}


/**
 * API GET '/:id'
 * @param {*} req 
 * @param {*} res 
 */
export const profileOfUser = async (req, res) => {
}