import { User } from "../models/user.js";
import { setUser } from "../service/auth.js";

export const handleUserSignUp=async(req,res)=>{
    const {name,email,password}=req.body;

    await User.create({
        name,email,password
    })

    return res.redirect('/login');
}

export const handleUserLogIn=async(req,res)=>{
    const {email,password}=req.body;

    const user=await User.findOne({email,password});
    if(!user)return res.render('login',{
        error:"Invalid email or password"
    });

    //create a cookie which stores the JWT token
    const token=setUser(user);
    res.cookie('sessionToken',token);

    return res.redirect('/');
}