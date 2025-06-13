import mongoose from "mongoose";

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
},
{timestamps:true}
);

export const URL=mongoose.model('url',urlSchema);