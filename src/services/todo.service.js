import { Todo } from "../models/todo.model.js";

export const findTodoById = async (_id) => {
    return await Todo.findOne({ _id });
}

export const createNewTodo = async (instance) => {
    console.log();
    return await Todo.create(instance);
}

export const getAllTodoList = async (user) => {
    return await Todo.find({user});
}

export const updateTheTodo = async (instance) => {
    return await instance.save();
}

export const delTheTodo = async (_id) => {
    return await Todo.findByIdAndDelete({_id});
}