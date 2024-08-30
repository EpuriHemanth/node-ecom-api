import mongoose from "mongoose";
import { likeSchema } from "./like.schema.js";
import { ObjectId } from "mongodb";
const likeModel=mongoose.model('likes',likeSchema);
export default class LikeRepository{


    async getLikes(id,type){
        try{
            return await likeModel.find({
                likedOne:new ObjectId(id),

                types:type
            }).populate('user').populate({path:'likedOne',model:type});

        }
        catch(err){
            console.log(err);

        }
    }

    async likingProduct(userId,id){
        try{
            const newLike=new likeModel({
                user:new ObjectId(userId),
                likedOne:new ObjectId(id),
                types:"products"
            });
            newLike.save();
            

        }
        catch(err){
            console.log(err);

        }
    }

    async likingCategory(userId,id){
        try{
            const newLike=new likeModel({
                user:new ObjectId(userId),
                likedOne:new ObjectId(id),
                types:"categories"
            });
            newLike.save();
            

        }
        catch(err){
            console.log(err);

        }
    }


    
}