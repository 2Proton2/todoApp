import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.config.js';
dotenv.config({path: '.env'});
const PORT = process.env.PORT;

const app = express();

/**
 * connect db
 */
connectDB();

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

const server = app.listen(PORT, () => {
    console.log(`Server is listening at [${PORT}]`);
})