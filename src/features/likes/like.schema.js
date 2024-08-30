import mongoose from 'mongoose';

export const likeSchema=new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    likedOne:{
        type:mongoose.Schema.Types.ObjectId,
        refPath:'types'
    },
    types:{
        type:String,
        enum:['categories','products']
    }

}).pre('save',(next)=>{//like this we can apply on any method like save
    console.log("receive the like");
    next();
}).post('save',(docs)=>{
    console.log("liked the product");
    console.log(docs);
})