import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRoute from './routes/user.route.js';
import { connectDB } from './config/db.config.js';
dotenv.config({path: '.env'});
const PORT = process.env.PORT;
import { notFound, errorHandler } from './middlewares/errorHandler.middlerware.js';

const app = express();

/**
 * connect db
 */
connectDB();

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

/**
 * Routes
 */
app.use('/api/user', userRoute);

/**
 * errorhandler
 */
app.use(notFound);
app.use(errorHandler);

const server = app.listen(PORT, () => {
    console.log(`Server is listening at [${PORT}]`);
})