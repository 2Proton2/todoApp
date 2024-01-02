import mongoose from "mongoose";
import { connectDB } from "./config/db.config.js";
import dotenv from 'dotenv';
import { User } from './models/user.model.js';
import users from "./data/users.js";
import todoData from "./data/todos.js";
import { Todo } from "./models/todo.model.js";

function assignTodotoUser(users, todos){
    let addedUserTodo = [];
    
    todos.forEach((each) => {
        //shuffling the user from 0 to 2 index
        const random = Math.floor(Math.random() * 3);
        let user = users[random];

        addedUserTodo.push({
            ...each,
            "user": user._id
        });
    })
    return addedUserTodo
}

try {
    dotenv.config({path: '.env'});
    connectDB();
    
    const importData = async () =>  {
        try {
            await User.deleteMany();
            await Todo.deleteMany();
            console.log('inside import : Data deleted successfully');
    
            const exportUser = await User.insertMany(users);
            console.log('exportUser => ', exportUser);

            let todoToInsert = assignTodotoUser(exportUser, todoData);
            const insertedTodos = await Todo.insertMany(todoToInsert);
            console.log('insertedTodos => ', insertedTodos);
            process.exit();
        } catch (error) {
            console.log(`${error}`)
            process.exit(1);
        }
    }
    
    const destroyData = async () => {
        try {
            await User.deleteMany();
            console.log('Data destroyed successfully');
        } catch (error) {
            console.log(`${error}`)
            process.exit(1);
        }
    }
    
    if(process.argv[2] === '-d'){
        destroyData();
    }
    else {
        importData();
    }
} catch (error) {
    console.log(error)
}