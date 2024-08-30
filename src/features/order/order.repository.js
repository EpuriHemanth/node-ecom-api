import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { getClient } from "../../config/mongodb.js";
import OrderModel from "./order.model.js";


export default class OrderRepository{

    constructor(){
        this.collection="orders";
    }
  
    async placeOrder(userId){
        const client=getClient();
        const session=client.startSession();
        const db= getDB();
        try{
            //get the cart items of the user and calculate the total amount
            session.startTransaction();

        const items=await this.getTotalAmount(userId);
        //calculating final total Amount
        const finalTotalAmount= items.reduce((acc,item)=>{
            return acc+item.totalAmount;
           },0);
           console.log(finalTotalAmount);
           
        //create arecord for order
        const newOrder= new OrderModel(userId,finalTotalAmount,new Date());
        db.collection(this.collection).insertOne({newOrder},{session});

         //reduce the stock(products quantity)

         for(let item of items){
            await db.collection("products").updateOne({_id:new ObjectId(item.productId)},{$inc:{stock: -item.quantity}},{session});
         }
        
        //  throw new Error("Something went wrong while placing the order");
            //clear the cart
            await db.collection("cartItems").deleteMany({userId: new ObjectId(userId)},{session});
            session.commitTransaction();//it basically updates the data base after completing all the operations in the transaction
            
            


        }
        catch(err){
            await session.abortTransaction();
            
            console.log("something went wrong in the transaction");
        }
        finally {
            // End the session in both success and error cases
            session.endSession();
        }
        


       
     
    }

    async getTotalAmount(userId){
        const session=getClient().startSession();
           const db= getDB();
           const collection=db.collection("cartItems");
           const items=await collection.aggregate([
            //matching the cart items with userId
            {
                $match:{userId:new ObjectId(userId)}
            },
            //adding the product items in the products collection to the cart items collection based on _id & productId
            {
                $lookup:{
                    from:"products",
                    localField:"productId",
                    foreignField:"_id",
                    as:"productInfo"

                }
            },
            //unwinding the documents based on the productInfo elements
            {
                $unwind:"$productInfo"
            },
            //adding the field totalAmount and calculating the value of the totalAmount
            {
                $addFields:{totalAmount:{$multiply:["$productInfo.price","$quantity"]}}
            }
           ],{session}).toArray();
          return items;

           

    }



}