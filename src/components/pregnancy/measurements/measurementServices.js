import { findEntry, addEntry, removeEntry, UpdateEntry } from "../../../../database/pregnancy/sub/measurementMethods.js";

async function add(req, res, next){
    const data = req.body.data;
    const type = req.body.type;
    const adding = await addEntry(type, data);
    if(adding instanceof Error) return next(adding);
    return res.send({ message: "measurements added" });
}
async function update(req, res, next){

}
async function remove(req, res, next){

}

export const measurementServices = { add, update, remove };
