import { Todo } from "../models/todo.model.js";
import { createNewTodo, delTheTodo, getAllTodoList, updateTheTodo } from "../services/todo.service.js";
/**
 * API POST '/create'
 * @param {*} req 
 * @param {*} res 
 */
export const createTodo = async (req, res) => {
    let { title, description, dueDate, completed } = req.body;
    const user = req.user._id;
    dueDate = dueDate || Date.now() + 24 * 60 * 60 * 1000;
    completed = completed || false;

    const todoObj = { title, description, user, dueDate, completed };

    const todoInstance = await createNewTodo(todoObj);;

    if (todoInstance) {
        res.status(201).json({
            data: todoInstance,
            message: 'todo-list created'
        });
    } else {
        res.status(400);
        throw new Error(`Cannot create new todo list`);
    }
}

/**
 * API GET '/all'
 * @param {*} req 
 * @param {*} res 
 */
export const getAllTodo = async (req, res) => {
    const todoList = await getAllTodoList(req.user._id);

    if (todoList) {
        res.status(200).json({
            data: todoList,
            message: 'fetched all data'
        });
    } else {
        res.status(500);
        throw new Error(`Failed to fetch todo lists`);
    }

}

/**
 * API GET '/particular/:id'
 * @param {*} req 
 * @param {*} res 
 */
export const getParticularTodo = async (req, res) => {
    if (req.todoList) {
        res.status(200).json({
            data: req.todoList,
            message: 'particular todo-list is fetched'
        });
    }
    else {
        res.status(500);
        throw new Error(`Failed to fetch todo list`);
    }

}

/**
 * API PUT '/edit/:id'
 * @param {*} req 
 * @param {*} res
 */
export const editParticularTodo = async (req, res) => {
    const userTodo = req.todoList;

    Object.keys(req.body).map((element) => {
        if (userTodo[element] || element === 'completed') {
            userTodo[element] = req.body[element];
        }
    });

    const updatedUserTodo = await updateTheTodo(userTodo);

    if(updatedUserTodo){
        res.status(200).json({
            data: updatedUserTodo,
            message: 'todo-list updated successfully'
        });
    }
    else{
        res.status(500);
        throw new Error(`Error while updating the todo`)
    }
}

/**
 * API DELETE '/delete/:id'
 * @param {*} req 
 * @param {*} res 
 */
export const deleteParticularTodo = async (req, res) => {
    const del = await delTheTodo(req.todoList._id);
    res.status(204).json({});
}