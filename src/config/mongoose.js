import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const url= process.env.DB_URL;
import { categoriesSchema } from '../features/product/category.schema.js';

export const connectUsingMongoose=async ()=>{

    try{
        await mongoose.connect(url,{useNewURLParser:true,useUnifiedTopology:true});
        addCategories()
        console.log("connected to mongodb using mongoose");

    }
    catch(err){
        console.log(err);
    }
}

async function addCategories(){
    const categoryModel=mongoose.model('categories',categoriesSchema);
    const presentCategories=await categoryModel.find();
    
    if(!presentCategories||presentCategories.length==0){
        await categoryModel.insertMany([{name:"Clothes"},{name:"electronics"},{name:"books"}]);
    }
    console.log("categories are added");

}