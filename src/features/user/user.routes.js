import express from 'express';
import UserController from './user.controller.js';
import jwtAuth from '../middlewares/jwt.middleware.js';
const userController=new UserController();

//intialise the router
const userRouter= express.Router();


//give the paths
userRouter.post('/signUp',(req,res,next)=>{
    userController.signUp(req,res,next);
});
userRouter.post('/signIn', (req,res)=>{
    userController.signIn(req,res);
});

userRouter.put('/reset',jwtAuth,(req,res)=>{
    userController.resetPassword(req,res);
})


export default userRouter;