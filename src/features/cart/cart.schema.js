import { Schema } from "mongoose";

export const cartSchema=new Schema({
    userId:{type:ObjectId,ref:"users"},
    productId:{type:ObjectId,ref:"products"},
    quantity:Number
});