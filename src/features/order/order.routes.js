import OrderController from "./order.controller.js";



import express from "express";


const OrderRouter= express.Router();
const orderController=new OrderController();

OrderRouter.post("/",(req,res)=>{

    orderController.placeOrder(req,res);

});

export default OrderRouter;