import { Todo } from "../models/todo.model.js";

export const findTodoById = async (_id) => {
    return await Todo.findOne({ _id });
}