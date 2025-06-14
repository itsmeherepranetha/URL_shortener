import { getUser } from "../service/auth.js";

export const restrictToLoggedInUserOnly=async(req,res,next)=>{

    const userSessionToken=req.cookies?.sessionToken;

    if(!userSessionToken)return res.redirect('/login');

    const user=getUser(userSessionToken);

    if(!user)return res.redirect('/login');

    req.user=user;
    next();
}

// just checking, and not enforcing
export const checkAuth=async(req,res,next)=>{

    const userSessionToken=req.cookies?.sessionToken;

    const user=getUser(userSessionToken);

    req.user=user;
    next();
}