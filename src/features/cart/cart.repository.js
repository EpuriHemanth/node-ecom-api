
import { ObjectId} from "mongodb";
import { getDB } from "../../config/mongodb.js";


export default class CartRepository{
    

    async add(userId,productId,quantity){
        const db= getDB();
        const collection= db.collection("cartItems");
        const id=await this.getNextCounter(db);
        
        

        try{

            // await collection.insertOne({userId: new ObjectId(userId),productId:new ObjectId(productId),quantity:quantity});

            await collection.updateOne(
                { productId: new ObjectId(productId), userId: new ObjectId(userId) },
                {
                    $setOnInsert: { _id: id, productId: new ObjectId(productId), userId: new ObjectId(userId) },
                    $inc: { quantity: Number(quantity) }
                },
                { upsert: true }
            );
            

        }
        catch(err){
            console.log(err);

        }
        

    }

    async getByUserId(userId){
        const db= getDB();
        const collection= db.collection("cartItems");

        try{

            const cartItems= await collection.find({userId:new ObjectId(userId)}).toArray();
            return cartItems;

        }
        catch(err){
            console.log(err);
        }
    }

    async deleteCartItem(userId,cartItemId){
        const db= getDB();
        const collection= db.collection("cartItems");
        try{

            const result=await collection.deleteOne({userId: new ObjectId(userId),_id: new ObjectId(cartItemId)});
            return result.deletedCount;


        }
        catch(err){
            console.log(err);
        }
    }

    async getNextCounter(db){

        const resultDocument= await db.collection("counters").findOneAndUpdate({_id:"cartItemId"},{$inc:{value:1}},{returnDocument:"after"});
        
        return resultDocument.value;

    }
}