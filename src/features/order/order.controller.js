import OrderRepository from "./order.repository.js";



export default class OrderController{

    constructor(){
        this.orderRepository= new OrderRepository();


    }

    async placeOrder(req,res){

        const userId=req.userId;

        try{
            await this.orderRepository.placeOrder(userId);
            res.status(201).send("Placed order successfully");
        }
        catch(err){
            console.log(err);
        }
    }
}