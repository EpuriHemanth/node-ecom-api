


import CartRepository from "./cart.repository.js";

export default class CartController{

    constructor(){
        this.cartRepository= new CartRepository();
    }


    async addToCart(req,res){
        const productId= req.query.productId;
        const quantity=req.query.quantity;
        const userId=req.userId;
       
        try{
            const item=await this.cartRepository.add(userId,productId,quantity);
            res.status(201).send("Successfully added to the cart");
        } 
        catch(err){
            console.log(err);
        }
        
    }

    async getCartItems(req,res){
        const userId= req.userId;
        
       
        try{

            const cartItems= await this.cartRepository.getByUserId(userId);
            res.status(201).send(cartItems);


        }
        catch(err){
            console.log(err);
        }
    }
    async delete(req, res) {
        const userId=req.userId;
        const cartItemId=req.params.id;
        const result= await this.cartRepository.deleteCartItem(userId,cartItemId);
        
        if(result>0){
            res.status(200).send("Removed Successfully from the cart");
        }
        else{
            res.status(400).send("No cart items present");
        }
        
    }

    
}