import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import moment from 'moment-timezone';
import { findUserById } from '../services/user.service.js'

export const protectUser = async (req, res, next) => {
    let token;
    token = req.cookies.jwt;
    //Check token is present or not
    if (token) {
        const decoded = jwt.verify(token, process.env.PRIVATE_KEY);

        req.user = await findUserById(decoded.userId)
        next();
    }
    else {
        res.status(401);
        throw new Error('User not authorized');
    }
}