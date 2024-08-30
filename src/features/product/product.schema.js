import { Schema } from "mongoose";
import mongoose from 'mongoose';
export const productSchema=new Schema({
    name:String,
    desc:String,
    price:Number,
    category:String,
    imageUrl:String,
    sizes:String,
    stock:Number,
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'reviews'
    }],
    categories:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'categories' //refer to categories collection
    }]
});