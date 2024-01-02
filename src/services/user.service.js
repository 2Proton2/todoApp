import { User } from '../models/user.model.js';

export const addUser = async (email, password) => {
    return await User.create({ email, password });
}

export const findUserByMail = async (email) => {
    return await User.findOne({ email });
}

export const findUserById = async (_id) => {
    return await User.findOne({ _id });
}