import { pool } from "../../db.js";
import { DBError } from "../../../src/utils/backendError.js";

export async function findEntry(measurementID) {
    let connection;
    try{
        connection = await pool.getConnection();
        try{
            let query = "SELECT 1 FROM measurement WHERE measurement_id = UUID_TO_BIN(?)";
            const results = await connection.query(query, [measurementID]);
            return results.length === 1;

        }
        catch(error){
            console.log(error);
            return new DBError(`could not perform search on DB `, error);
        }
    }
    catch(error){
        return new DBError("Could not connect to DB", error);
    }
    finally{
        connection.release();
    }
}

export async function addEntry(type,entries){
    let connection;
    try{
        connection = await pool.getConnection();
        try{
            let query;
            let valuearray = [];
            if(type === "bloodpressure") {
                query = "INSERT INTO measurement (pregnancy_id, type, date, value, value2) VALUES ";
                for(let i = 0; i < entries.length - 1; i++) {
                    query += "(UUID_TO_BIN(?), ?, ?, ?, ?),";
                    valuearray.push(...entries[i]);
                }
                query += "(UUID_TO_BIN(?), ?, ?, ?, ?);";
                valuearray.push(...entries[entries.length - 1]);
            } else {
                query = "INSERT INTO measurement (pregnancy_id, type, date, value) VALUES ";
                for(let i = 0; i < entries.length - 1; i++) {
                    query += "(UUID_TO_BIN(?), ?, ?, ?),";
                    valuearray.push(...entries[i]);
                }
                query += "(UUID_TO_BIN(?), ?, ?, ?);";
                valuearray.push(...entries[entries.length - 1]);
            }

            const [results] = await connection.query(query, valuearray);
            console.log(results);
            return results.affectedRows > 0;

        }
        catch(error){
            console.log(error);
            return new DBError(`could not perform search on DB `, error);
        }
    }
    catch(error){
        return new DBError("Could not connect to DB", error);
    }
    finally{
        connection.release();
    }
}

export async function UpdateEntry(measurementID, value) {
    let connection;
    try{
        connection = await pool.getConnection();
        try{
            let query = "UPDATE measurement SET value = ? WHERE measurement_id = (?)";
            const results = await connection.query(query, [value,measurementID]);
            console.log(results);
            return results.affectedRows === 1;
        }
        catch(error){
            console.log(error);
            return new DBError(`could not update entry`, error);
        }
    }
    catch(error){
        return new DBError("Could not connect to DB", error);
    }
    finally{
        connection.release();
    }

}

export async function removeEntry(measurementID){
    let connection;
    try{
        connection = await pool.getConnection();
        try{
            let query = "DELETE FROM measurement WHERE measurement_id = UUID_TO_BIN(?)";
            const results = await connection.query(query, [measurementID]);
            return results.length === 1;

        }
        catch(error){
            console.log(error);
            return new DBError(`could not delete entry `, error);
        }
    }
    catch(error){
        return new DBError("Could not connect to DB", error);
    }
    finally{
        connection.release();
    }
}