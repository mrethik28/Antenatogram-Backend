import { pool } from "../db.js";
import { DBError } from "../../src/utils/backendError.js";
export async function addNewRefreshToken(token, role, id) {
    let connection;
    try{
         connection = await pool.getConnection();
         try{
            let query;
            if(role === "patient") query  = `INSERT INTO patientrefreshtoken(patient_id, token) VALUES (?,?)`
            if(role === "doctor") query  = `INSERT INTO doctorrefreshtoken(doctor_id, token) VALUES (?,?)`
            const [results] = await connection.query(query, [id,token]);
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