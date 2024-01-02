import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import moment from "moment-timezone";
import genToken from "../utilities/gentoken.js";
import { addUser, findUserById, findUserByMail } from "../services/user.service.js";

/**
 * API POST '/sign-in'
 * @param {*} req 
 * @param {*} res 
 */
export const signUser = async (req, res) => {
    const { email, password } = req.body;

    const userExists = await findUserByMail(email);

    if (userExists) {
        throw new Error(`User already exists`);
    }

    const userInstance = await addUser(email, password);

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
        res.status(400)
        throw new Error(`Error while registering the user`);
    }
}

/**
 * API POST '/login'
 * @param {*} req 
 * @param {*} res 
 */
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await findUserByMail(email);

    if(user && (await user.matchPassword(password))) {
        genToken(res, user._id)
        res.status(200).json({
            data: {
                _id: user._id,
                email: user.email
            },
            message: 'logged in'
        });
    } else {
        res.status(401);
        throw new Error(`Invalid email or Incorrect Password`);
    }
}

/**
 * API POST '/logout'
 * @param {*} req 
 * @param {*} res 
 */
export const logoutUser = async (req, res) => {
    res.cookie('jwt', '', {
        expires: new Date(0),
        httpOnly: true,
    })
    res.status(200).json({
        data: '',
        message: 'logged out'
    });
}


/**
 * API GET '/:id'
 * @param {*} req 
 * @param {*} res 
 */
export const profileOfUser = async (req, res) => {
    const decoded = jwt.verify(req.cookies.jwt, process.env.PRIVATE_KEY);
    const user = await findUserById(decoded.userId);

    if (!user) {
        res.status(404)
        throw new Error(`User doesn't exits`)
    }
    res.status(200).json({
        data: user,
        message: 'profile information fetched successfully'
    });
}