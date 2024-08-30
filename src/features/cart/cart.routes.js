import express from 'express';
import CartController from './cart.controller.js';

const cartController= new CartController();


const cartRouter= express.Router();

cartRouter.post('/addToCart',(req,res)=>{
    cartController.addToCart(req,res)
});
cartRouter.get('/getCartItems',(req,res)=>{
    cartController.getCartItems(req,res)
});
cartRouter.delete('/delete/:id',(req,res)=>{
    cartController.delete(req,res);
});

export default cartRouter;