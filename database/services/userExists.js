import { AuthenticationError, DBError } from "../../src/utils/backendError.js";
import {pool} from "../db.js"
export async function userExists(userRole, email) {
    const role = userRole.toLowerCase();
    let connection;
    try{
         connection = await pool.getConnection();
         try{
            let query;
            if(role ==="patient") query = `SELECT * FROM patient WHERE email=(?);`;
            else if(role ==="doctor") query = `SELECT * FROM doctor WHERE email=(?);`;
            else return new AuthenticationError("invalid role");
            const [rows] = await connection.query(query,[email]);
            if(rows.length > 0) return rows[0];
            return false;
         }
         catch(error){
            console.log(error);
            return new DBError("Could not query to DB", error);
         }
    }
    catch(error){
        return new DBError("Could not connect to DB", error);
    }
    finally{
        connection.release();
    }
}