import {
    findEntry,
    addEntry,
    removeEntry,
    updateEntry
} from "../../../../database/pregnancy/sub/measurementMethods.js";
import {DBError, LogicError} from "../../../utils/Errors.js";

async function add(req, res, next){
    const data = req.body.data;
    const type = req.body.type;
    const adding = await addEntry(type, data);
    if(adding instanceof Error) return next(adding);
    return res.send({ message: "measurements added" });
}
async function update(req, res, next){
    let data,type,length;
    try{
        data = req.body.data;
        type = req.body.type;
        length = data.length; // this is only to check if there is some data, otherwise, raise error
    }
    catch (e){
        return next(new LogicError("no data received"));
    }
    /* here we expect data to be an array like
    [
        {measurementID: "adsa", value: 3} //add value 2 also for bloodpressure
    ]
    we will first check each entry to be present then we will update them, raising errors on the way as necessary
    */
    try{
        const finding = await findEntry(data.map(entry => entry.measurementID));
        if(finding instanceof Error) return next(finding);
        const updating = await updateEntry({type,data});
        if(updating instanceof Error) return next(updating);
        return res.json({"message": "users updated successfully"});
    }catch (e) {
        console.log(e);
        return next(new DBError("could not update values"))
    }

}
async function remove(req, res, next){
    let data,length;
    try{
        data = req.body.data;
        length = data.length; // this is only to check if there is some data, otherwise, raise error
    }
    catch (e){
        return next(new LogicError("no data received"));
    }

    try{
        const finding = await findEntry(data.map(entry => entry.measurementID));
        if(finding instanceof Error) return next(finding);
        const deleting = await removeEntry(data);
        if(deleting instanceof Error) return next(deleting);
        return res.json({"message": "users deleted successfully"});
    }catch (e) {
        console.log(e);
        return next(new DBError("could not delete values"))
    }
}
async function fetch(req, res, next){

}
export const measurementServices = { add, update, remove, fetch };
