
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { reviewSchema } from "./review.schema.js";
import { productSchema } from "./product.schema.js";
import { categoriesSchema } from "./category.schema.js";

const reviewModel= mongoose.model('reviews',reviewSchema);
const productModel= mongoose.model('products',productSchema);
const categoriesModel=mongoose.model('categories',categoriesSchema);
export default class ProductRepository{


    async addProduct(productData){
        
        try{
            //add the categories ids to the product
            const newProduct= new productModel(productData);
            newProduct.save();
            //add the productId for the respective categories
            await categoriesModel.updateMany({_id:{$in:productData.categories}},{$push:{products:new ObjectId(productData._id)}})

        }
        catch(err){
            console.log(err);
        }
    }


    async getAllProducts(){
        const db= getDB();
        const collection= db.collection("products");
        try{
            const products= await collection.find().toArray();
            return products;
        }
        catch(err){
            console.log(err);
        }
    }

    async getById(id){
        const db= getDB();
        const collection = db.collection("products");
        try{
            const product= await collection.findOne({_id: new  ObjectId(id)});
            return product;
        }
        catch(err){
            console.log(err);
        }
    }


    async filter(minPrice,maxPrice,category){
        
        let filterExpression={};
        const db= getDB();
            const collection= db.collection("products");
            if(minPrice){
                filterExpression.price={$gte:parseFloat(minPrice)};

            }
            if(maxPrice){
                filterExpression.price= {...filterExpression.price,$lte:parseFloat(maxPrice)};
            }
            if(category){
                filterExpression.category=category;
            }
        try{

            const products=await collection.find(filterExpression).toArray();
            return products;
            

        }
        catch(err){
            console.log(err);
        }

    }

    async rate(userId, productId, rating) {
        try {
            // Find if the product exists or not
            const findProduct = await productModel.findById(productId);
            if (!findProduct) {
                throw new Error("Product not found");
            }
    
            // Find the review or create/update it
            const findReview = await reviewModel.findOne({ userId: new ObjectId(userId), productId: new ObjectId(productId) });
            if (findReview) {
                findReview.rating = rating;
                await findReview.save();
            } else {
                const newReview = new reviewModel({
                    productId: new ObjectId(productId),
                    userId: new ObjectId(userId),
                    rating: rating
                });
                await newReview.save();
            }
        } catch (err) {
            console.log(err);
        }
    }

    //understanding $and  $or operators
    async undersatingLogicalOperators(minPrice,category){

        const db= getDB();
        const collection= db.collection("products");
         let filterExpression={};
       
        if(minPrice&&category){
            filterExpression={$or:[{price:{$gte:parseInt(minPrice)}},{category:category}]};//can use $and in the same way

        }
        try{
            const products= await collection.find(filterExpression).toArray();
            
             return products;

        }
        catch(err){

            console.log(err);

        }
    }

    //understanding $in operator

    async inOperator(categories){
        const db= getDB();
        const collection= db.collection("products");
        categories= JSON.parse(categories.replace(/'/g,'"'));
        console.log(categories);
        try{
            const products= await collection.find({category:{$in:categories}}).project({name:1,price:1,ratings:{$slice:1}}).toArray();
            return products;
        }
        catch(err){
            console.log(err);
        }
    }
//we want to get the average price for the category given
    async averagePriceForCategory(){
        const db= getDB();
        const collection= db.collection("products");

        try{

            return await collection.aggregate([
                {
                //stage-1: group the elements based on category and give the average
                $group:{_id:"$category",averagePrice:{$avg:"$price"}}
            }
        ]).toArray();

            

        }
        catch(err){

            console.log(err);

        }
    }
}