import { pool } from "../../db.js";
import { DBError } from "../../../src/utils/backendError.js";

export async function findAndUpdateEntry(entry) {
    let connection;
    try{
         connection = await pool.getConnection();
         try{
            let query = "UPDATE measurement SET value = ? WHERE measurement_id = (?)";
            const results = await connection.query(query, [entry.value,entry.measurement_id]);
            console.log(results);
            if(results.affectedRows == 1) return true;
            return false;
         }
         catch(error){
            console.log(error);
            return new DBError("Could not add refresh token to DB", error);
         }
    }
    catch(error){
        return new DBError("Could not connect to DB", error);
    }
    finally{
        connection.release();
    }
            
}