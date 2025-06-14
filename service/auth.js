import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()

const JWT_SECRET=process.env.JWT_SECRET;

export const setUser=user=>{
    const payload={
        _id:user._id,
        email:user.email,
    }
    return jwt.sign(payload,JWT_SECRET); // the details of user object itself as payload, and putting my sign on the token using the secret
}

export const getUser=token=>{
    if(!token)return null;

    try{
        return jwt.verify(token,JWT_SECRET); // verifying the token and also making sure my sign is there using the secret
    }
    catch(err){
        return null;
    }
    
}