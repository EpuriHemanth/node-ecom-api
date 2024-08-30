import mongoose from 'mongoose';


export const reviewSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'products'
    },
    rating:Number
});