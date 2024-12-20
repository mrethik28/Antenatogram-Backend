import { AuthenticationError, DBError } from "../../src/utils/Errors.js";
import {pool} from "../db.js"
export async function addUser(userRole, email, passwordhash) {
    const role = userRole.toLowerCase();
    let connection;
    try{
         connection = await pool.getConnection();
         try{
            let query;
            if(role=="patient") query = `INSERT INTO patient(email, passwordhash) VALUES (?,?)`;
            else if(role=="doctor") query = `INSERT INTO doctor(email, passwordhash) VALUES (?,?)`;
            else return new AuthenticationError("invalid role");
            connection.query(query, [email,passwordhash]);
         }
         catch(error){
            return new DBError("Could not insert user to DB", error);
         }
    }
    catch(error){
        return new DBError("Could not connect to DB", error);
    }
    finally{
        connection.release();
    }
}