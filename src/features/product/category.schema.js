import mongoose from 'mongoose';

export const categoriesSchema=new mongoose.Schema({
    name:String,
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'products' //refere to products collection
    }]
})