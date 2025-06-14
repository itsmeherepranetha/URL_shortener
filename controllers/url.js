import { nanoid } from 'nanoid';
import { URL } from '../models/url.js';

export const handleGenerateNewShortUrl=async(req,res)=>{
    const body=req.body;
    if(!body.url)return res.status(400).json({error:'url is required'});

    const nanoId=nanoid(8);
    await URL.create({
        nanoId:nanoId,
        redirectUrl:body.url,
        visitHistory:[],
        createdBy:req.user._id,
    })

    return res.render('home',{
        id:nanoId,
    });
}


export const handleGetAnalytics=async(req,res)=>{
    const nanoId=req.params.nanoId;
    const urlEntry=await URL.findOne({nanoId:nanoId});

    res.json({
        totalClicks:urlEntry.visitHistory.length,
        analytics:urlEntry.visitHistory
    })
}