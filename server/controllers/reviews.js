import prisma from "../utils/prisma.js";
import { createReviewsDb } from "../domains/domain.js";
import { getLocationReviews } from "../domains/domain.js";

const createReviews = async (req, res)=>{
    const {content, userId, locationId} = req.body

    if(!content || !userId || !locationId)
    return  res.status(400).json({ error: 'Missing field in the request body' });

    try{
        const newReview = await createReviewsDb(content, userId, locationId)
        return res.status(200).json({review: newReview})
    }catch(err){
        console.log(err)
        return res.status(500).json({ error: err.message });
    }

}

const getReviews = async(req, res)=>{
    const locationId = Number(req.params.locationId);
    try{
        const reviews = await getLocationReviews( locationId)
        return res.status(200).json({reviews})
    } catch(err){
        return res.status(500).json({error:err.message})
    }
}

export  {createReviews, getReviews}