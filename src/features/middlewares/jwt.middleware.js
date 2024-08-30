import jwt from 'jsonwebtoken';

const jwtAuth=(req,res,next)=>{


    //Read the token
    const token= req.cookies.jwtToken;
  
 
    //if no token return error
    if(!token){
        res.status(401).send("Unauthorized");

    }
    //verify token
    try{
        const payLoad= jwt.verify(token,process.env.JWT_KEY);
       
        req.userId=payLoad.userId //attaching userId property to req object equals to the payload's userId
    }
    catch(err){
        
        res.status(401).send("Unauthorized");
    }
    next();
}
export default jwtAuth;