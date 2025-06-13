import express from 'express'
const app=express();
import { connectToMongoDB } from './mongoConnect.js';
import { URL } from './models/url.js';
const PORT=8000;
import router from './routes/url.js';
import dotenv from 'dotenv';
dotenv.config();
const MONGODB_URL=process.env.MONGODB_URL;

connectToMongoDB(MONGODB_URL).then(()=>console.log("mongodb connected"))

app.use(express.json())


app.use('/url',router);


app.get('/:nanoId',async(req,res)=>{
    const nanoId=req.params.nanoId;
    const urlEntry=await URL.findOneAndUpdate({
        nanoId
    },{$push:{
        visitHistory:{
            timestamp:Date.now(),
        }
    }});

    res.redirect(urlEntry.redirectUrl)
})



app.listen(PORT,()=>{`express server running on port ${PORT}`});