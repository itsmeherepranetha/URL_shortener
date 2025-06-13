import express from 'express'
const app=express();
import path from 'path';
import { connectToMongoDB } from './mongoConnect.js';
import { URL } from './models/url.js';
const PORT=8000;
import router from './routes/url.js';
import staticRouter from './routes/staticRouter.js';
import dotenv from 'dotenv';
dotenv.config();
const MONGODB_URL=process.env.MONGODB_URL;

connectToMongoDB(MONGODB_URL).then(()=>console.log("mongodb connected"))

app.set('view engine','ejs');
app.set('views',path.resolve('./views'));

app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.use('/url',router);
app.use('/',staticRouter);

app.get('/:nanoId',async(req,res)=>{
    const nanoId=req.params.nanoId;
    const urlEntry=await URL.findOneAndUpdate({
        nanoId
    },{$push:{
        visitHistory:{
            timestamp:Date.now(),
        }
    }});
    if(!urlEntry)return res.redirect('/');
    res.redirect(urlEntry?.redirectUrl);
})



app.listen(PORT,()=>{`express server running on port ${PORT}`});