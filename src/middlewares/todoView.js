import { Todo } from "../models/todo.model.js";
import { findTodoById } from '../services/todo.service.js';
import { viewPermission } from "../permission/view.permission.js"

export const getTheTodo = async (req, res, next) => {
    const todoListId = req.params.id;
    const todoList = await findTodoById(todoListId);

    if (todoList) {
        //protecting the todoLists from other users
        const permission = viewPermission(req.user._id, todoList.user)
    
        if (!permission) {
            res.status(401);
            throw new Error('Not Allowed');
        }
        req['todoList'] = todoList;
        next();
    } else {
        res.status(404);
        throw new Error(`Resource not found`);
    }
}