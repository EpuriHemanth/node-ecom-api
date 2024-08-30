import LikeController from "./like.controller.js";


import express from 'express';
const likeController= new LikeController();
const likeRouter= express.Router();

likeRouter.post('/',(req,res,next)=>{
    likeController.addingLike(req,res,next);
});
likeRouter.get('/',(req,res)=>{
    likeController.getLikes(req,res);
});
export default likeRouter;