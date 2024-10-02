import mysql from "mysql2/promise";
import { pool } from "./db.js";

export async function initDB() {
        const connection = await mysql.createConnection({
            host: "127.0.0.1",
            user: "root",
            password: "dixo",
        });

        try{
            await connection.query(
                'CREATE DATABASE IF NOT EXISTS antenatogram'
            );
            console.log("DB initialised");
        }
        catch(error){
            console.log("Could not init DB: ", error);
        }
}

async function initPatient() {
    let connection
    try{
        connection = await pool.getConnection();
        connection.query(`
            CREATE TABLE IF NOT EXISTS patient 
                ( patient_id CHAR(36) PRIMARY KEY,
                name TINYTEXT,
                email VARCHAR(319),
                phone TINYINT(10),
                dateofbirth DATE,
                addressline1 TINYTEXT,
                city TINYTEXT,
                state TINYTEXT,
                pincode INT(6),
                aadharnumber INT(12),
                nomineename TINYTEXT,
                nomineephonenumber TINYINT(10),
                passwordhash VARCHAR(72),
                refreshtoken TEXT )
            `)
    }
    catch(error) {
        console.error(error);
    }
    finally{
       return connection.release();
    }

}

export async function initRelations(){
    await initPatient();
}



