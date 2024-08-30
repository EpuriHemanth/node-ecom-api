import { getDB } from "../../config/mongodb.js";



export default class UserRepository{



    async signUp(newUser){
         //get the db

    const db= getDB();

    //get the collection
    const collection= db.collection("users");

    //addding the user
    try{
        await collection.insertOne(newUser);
        return newUser;
    }
    catch(err){
        console.log(err);
    }

    }

    async findByMail(email){

        //get the db

    const db= getDB();

    //get the collection
    const collection= db.collection("users");


    //finding the user

    try{
        const user=await collection.findOne({email:email});
        return user;
    }
    catch(err){
        console.log(err);
    }


    }
   
}