//importing the express

import './env.js';
import express from 'express';
import cors from 'cors';
import ProductRouter from './src/features/product/product.routes.js';
import swagger from 'swagger-ui-express';
import apiDocs from './swagger.json' assert { type: 'json' }; // Corrected path
import bodyParser from 'body-parser';
import multer from 'multer';
import userRouter from './src/features/user/user.routes.js';
import cookieParser from 'cookie-parser';
import cartRouter from './src/features/cart/cart.routes.js';
import {connectTOMongoDb} from './src/config/mongodb.js';
import jwtAuth from './src/features/middlewares/jwt.middleware.js';
import loggingMiddleware from './src/features/middlewares/logger.middleware.js';
import OrderRouter from './src/features/order/order.routes.js';
import { connectUsingMongoose } from './src/config/mongoose.js';
import likeRouter from './src/features/likes/like.routes.js';
import mongoose from 'mongoose';
import ApplicationError from './errorHandler/applicationError.js';
//creating the server

const server= express();

//configuring the cors
var corsOptions={
    origin: 'http://localhost:3000',

    
}

server.use(cors(corsOptions));
server.use(bodyParser.json());
server.use(loggingMiddleware);
server.use(cookieParser());

server.use('/api-docs',swagger.serve,swagger.setup(apiDocs));
// server.use(express.json());

//creating the routes as per the request from products
server.use('/api/orders',jwtAuth,OrderRouter);
server.use('/api/products',jwtAuth,ProductRouter);
server.use('/api/users',userRouter);
server.use('/api/cart',jwtAuth,cartRouter);
server.use('/api/likes',jwtAuth,likeRouter);


//creating the response from server
server.get('/',(req,res)=>{
    res.send('Welcome to E-commerce API');
})
//creating the middleware of errorhandling
server.use((err,req,res,next)=>{
    if(err instanceof mongoose.Error.ValidationError){
        res.status(400).send(err.message);
    }
    if(err instanceof ApplicationError){
        res.status(err.status).send(err.message);
    }
    res.status(500).send("Something went wrong");
})

//middleware when no api isn found

server.use((req,res)=>{
    res.status(404).send("No Api found");
})
//making the server listen
server.listen(3000,()=>{
    console.log('server is listening at port 3000');
    connectUsingMongoose();
   
})