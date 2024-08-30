
import mongoose from 'mongoose';
import { userSchema } from './user.schema.js';
import ApplicationError from '../../../errorHandler/applicationError.js';
const UserModel=mongoose.model("users",userSchema);

export default class UserRepository{
    async signUp(newUser){
        try{
            const user=new UserModel(newUser);
        await user.save();
        return user;
            
        }
        catch(err){
            if (err instanceof ApplicationError) { 
                throw new ApplicationError("something went wrong",401); 
            }
            if (err instanceof mongoose.Error.ValidationError) {
                throw err; 
            }
            
        }
        
    }
    async findByMail(email){
        try{

            return await UserModel.findOne({email:email});

        }
        catch(err){
            console.log(err);
        }
    }

    async resetPassword(userId,newPassword){
        try{

            const user=await UserModel.findOne({_id: userId});
            if(user){
                user.password=newPassword;
                user.save();
                return true;
            }
            else{
                return false;
            }

        }
        catch(err){
            console.log(err);
        }
    }
}