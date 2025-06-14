import mongoose from "mongoose";
import { connectToMongoDB } from "../mongoConnect.js";

const urlSchema=new mongoose.Schema({
    nanoId:{
        type:String,
        required:true,
        unique:true,
    },
    redirectUrl:{
        type:String,
        required:true,
    },
    visitHistory:[{timestamp:{type:Number}}],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
},
{timestamps:true}
);

export const URL=mongoose.model('url',urlSchema);