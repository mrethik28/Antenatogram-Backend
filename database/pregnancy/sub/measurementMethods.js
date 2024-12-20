import { pool } from "../../db.js";
import { DBError } from "../../../src/utils/Errors.js";

export async function findEntry(measurementIDs) {
    let connection;
    try{
        connection = await pool.getConnection();
        try{
            let results, flag = true;
            const query = "SELECT 1 FROM measurement WHERE measurement_id = UUID_TO_BIN(?)";
            for(let i=0; i<measurementIDs.length; i++){
                [results] = await connection.query(query, [measurementIDs[i]]);
                flag = flag && results.length>0
            }
            return flag;

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

export async function addEntry(addmeasurementsDTO){
    let connection;
    try{
        connection = await pool.getConnection();
        await connection.beginTransaction();
        try{
            let query;
            let type = addmeasurementsDTO.type, pregnancyID = addmeasurementsDTO.pregnancyID, entries = addmeasurementsDTO.data;
            let valuearray = [];
            if(type === "bloodpressure") {
                query = "INSERT INTO measurement (pregnancy_id, type, date, value, value2) VALUES ";
                for(let i = 0; i < entries.length - 1; i++) {
                    query += `(UUID_TO_BIN('${pregnancyID}'), '${type}', ?, ?, ?),`;
                    valuearray.push(...entries[i]);
                }
                query += `(UUID_TO_BIN('${pregnancyID}'), '${type}', ?, ?, ?);`;
                valuearray.push(...entries[entries.length - 1]);
            } else {
                query = "INSERT INTO measurement (pregnancy_id, type, date, value) VALUES ";
                for(let i = 0; i < entries.length - 1; i++) {
                    query += `(UUID_TO_BIN('${pregnancyID}'), '${type}', ?, ?),`;
                    valuearray.push(...entries[i]);
                }
                query += `(UUID_TO_BIN('${pregnancyID}'), '${type}', ?, ?);`;
                valuearray.push(...entries[entries.length - 1]);
            }

            const [results] = await connection.query(query, valuearray);
            console.log(results);
            return results.affectedRows > 0;

        }
        catch(error){
            console.log(error);
            connection.rollback();
            return new DBError(`could not add measurements to DB `, error);
        }
    }
    catch(error){
        return new DBError("Could not connect to DB", error);
    }
    finally{
        connection.release();
    }
}

export async function updateEntry(updatemeasurementsDTO) {
    let connection;
    try{
        connection = await pool.getConnection();
        await connection.beginTransaction();
        try{
            let results
            if(updatemeasurementsDTO.type === "bloodpressure"){
                let query = "UPDATE measurement SET value = (?), value2 = (?) WHERE measurement_id = UUID_TO_BIN(?)";
                for (let i = 0; i < updatemeasurementsDTO.data.length; i++) {
                    results = await connection.query(query, [updatemeasurementsDTO.data[i].value, updatemeasurementsDTO.data[i].value2, updatemeasurementsDTO.data[i].measurementID]);
                    if (results.affectedRows !== 1) throw new DBError("update failure, rolling back transaction");
                }
                return results;
            }
            else {
                let query = "UPDATE measurement SET value = (?) WHERE measurement_id = UUID_TO_BIN(?)";
                for (let i = 0; i < updatemeasurementsDTO.data.length; i++) {
                    results = await connection.query(query, [updatemeasurementsDTO.data[i].value, updatemeasurementsDTO.data[i].measurementID]);
                    if (results.affectedRows !== 1) throw new DBError("update failure, rolling back transaction");
                }
                return results;
            }
        }
        catch(error){
            console.log(error);
            connection.rollback()
            return new DBError(`could not update entries`, error);
        }
    }
    catch(error){
        return new DBError("Could not connect to DB", error);
    }
    finally{
        connection.release();
    }

}

export async function removeEntry(measurementIDs){
    let connection;
    try{
        connection = await pool.getConnection();
        await connection.beginTransaction()
        try{
            let query = "DELETE FROM measurement WHERE measurement_id = UUID_TO_BIN(?)";
            for(let i=0; i<measurementIDs.length; i++){
                const results = await connection.query(query, measurementIDs[i]);
                if (results.length !== 1) throw new DBError("could not delete, rolling back");
            }

        }
        catch(error){
            console.log(error);
            connection.rollback();
            return new DBError(`could not delete entries `, error);
        }
    }
    catch(error){
        return new DBError("Could not connect to DB", error);
    }
    finally{
        connection.release();
    }
}