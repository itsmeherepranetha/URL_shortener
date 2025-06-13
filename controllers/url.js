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
    })

    return res.json({id:nanoId});
}