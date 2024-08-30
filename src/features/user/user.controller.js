import { UserModel } from "./user.model.js";
import { ObjectId } from "mongodb";
import UserRepository from './user.repository.js'
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
export default class UserController{

    constructor(){
        this.userRepository=new UserRepository();
    }

    async signUp(req,res,next){
        try{
            const {name,email,password,type}=req.body;

            const hashPassword= await bcrypt.hash(password,12);
            const newUser= new UserModel(name,email,hashPassword,type);

            const result= await this.userRepository.signUp(newUser);
            res.status(201).send(result);

        }
        catch(err){
           next(err);
        }
       
    }

    async signIn(req,res){
        const {email,password}=req.body;

        try{
            
        const user=await this.userRepository.findByMail(email);
        if(!user){
            res.status(401).send("No User Found");
        }
        else{

            const result= await bcrypt.compare(password,user.password);
            if(result){
                //creating the token
            const token= jwt.sign({userId : new ObjectId(user._id),email : user.email},process.env.JWT_KEY,{
                expiresIn:"1d"
                
            });
           
            //sending the token
            res.cookie('jwtToken',token);
            res.status(201).send({user:result,token:token});
            }
            else{
                res.status(401).send("Invalid credentials");
            }

        }

        }
        catch(err){

            console.log(err);
            
        }

        
       
    }

    async resetPassword(req,res){
        const userId= req.userId;
        const {password} =req.body;
        try{
            const hashedPassword= await bcrypt.hash(password,12);

            const result= await this.userRepository.resetPassword(userId,hashedPassword);
            if(result){
                res.status(201).send("password reset successfully");
            }
            else{
                res.status(401).send("No user found");
            }

        }
        catch(err){
            console.log(err);
        }
    }
}