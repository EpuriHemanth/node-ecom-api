

import LikeRepository from "./like.repository.js"; 

export default class LikeController{
    constructor(){
        this.likeRepository= new LikeRepository();
    }
    async getLikes(req,res){
        const {id,type}=req.query;
        try{
            const allLikes=await this.likeRepository.getLikes(id,type);
            if(allLikes){
                res.status(200).send(allLikes);
            }
            else{
                res.status(401).send("no likes are there for this id");
            }

        }
        catch(err){
            console.log(err);
        }
    }

    async addingLike(req,res,next){
        const userId=req.userId;
        console.log(userId);
        const {id,type}=req.body;
        try{

            if(type!='categories'&&type!='products'){
                res.status(400).send("invalid type");

            }
            else{
                if(type=='products'){
                    await this.likeRepository.likingProduct(userId,id);
                }
                if(type=='categories'){
                    await this.likeRepository.likingCategory(userId,id);
                }
                res.status(200).send();

            }

        }
        catch(err){
            console.log(err);
        }
    }
}