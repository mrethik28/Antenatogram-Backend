import { pool } from "../db.js";
import { DBError } from "../../src/utils/backendError.js";

export async function addNewRefreshToken(token, role, id) {
    let connection;
    try{
         connection = await pool.getConnection();
         try{
            let query;
            if(role === "patient") query  = `INSERT INTO patientrefreshtoken(patient_id, token) VALUES (UUID_TO_BIN(?),(?))`
            if(role === "doctor") query  = `INSERT INTO doctorrefreshtoken(doctor_id, token) VALUES (UUID_TO_BIN(?),(?))`
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

export async function findAndDelete(role, token, userid, del) {
    let connection;
    try{
         connection = await pool.getConnection();
         try{
            let query;
            if(role=="patient") query = "SELECT * FROM patientrefreshtoken WHERE patient_id=UUID_TO_BIN(?) AND token=?;";
            if(role=="doctor") query = "SELECT * FROM doctorrefreshtoken WHERE doctor_id=UUID_TO_BIN(?) AND token=?;";
            const [results] = await connection.query(query, [userid, token]);
    
            if(results.length == 0) return false;
            if(del == 1 ) {
                if(role == "patient") query = "DELETE FROM patientrefreshtoken WHERE patient_id=UUID_TO_BIN(?) AND token=?;"; 
                if(role == "doctor") query = "DELETE FROM doctorrefreshtoken WHERE doctor_id=UUID_TO_BIN(?) AND token=?;"; 
                const [results] =  await connection.query(query, [userid,token]);
        
                if(results.affectedRows == 1) return true;
                else return false;
            }
            return true;
           
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