import {AuthenticationError, DBError, LogicError} from "../utils/Errors.js";

export async function errorHandler(err, req, res, next) {
    let type;
    if(err instanceof DBError) type = "DBERROR";
    if(err instanceof AuthenticationError) type = "AuthenticationError";
    if(err instanceof LogicError) type = "LogicError";

    return res.status(500).send({"error": {"type" : `${type}`, "message" : `${err.message}`}});
}
