import {getCurrentPregnancy, newPregnancy} from "../../../database/pregnancy/pregnancyMethods.js";

async function getLivePregnancy(req,res,next) {
    const userID = req.body.userID;
    const pregnancy = await getCurrentPregnancy(userID);
    if(!pregnancy) return res.json({"error" : "no pregnancy found" });
    return res.json({pregnancy});
}

async function addPregnancy(req,res,next) {
    const existing = await getCurrentPregnancy(req.body.userID);
    if(existing) return res.json({"error" : "user already has a live pregnancy"});

    const adding = await newPregnancy(req.body.userID);
    if(!adding) return res.json({"error" : "could not add pregnancy"});
    else return res.json({newPregnancy: adding});


}

export const pregnancyServices = {getLivePregnancy, addPregnancy};