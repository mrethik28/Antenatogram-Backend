import mysql from "mysql2/promise";
import { pool } from "./db.js";
import { patientSchema } from "./patient/patientSchema.js";
import { medicalhistorySchema, miscallenousSchema } from "./medicalhistory/medicalhistorySchema.js";
import { doctorSchema } from "./doctor/doctorSchema.js";
import { patientrefreshtokenSchema, doctorrefreshtokenSchema } from "./refreshtoken/refreshtokenSchema.js";
import { pregnancySchema } from "./pregnancy/pregnancySchema.js";
import { measurementSchema } from "./pregnancy/sub/measurementSchema.js";

async function initDB() {
  const connection = await mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "dixo",
  });

  try {
    await connection.query("CREATE DATABASE IF NOT EXISTS antenatogram");
    console.log("DB initialised");
  } catch (error) {
    console.log("Could not init DB: ", error);
  }
}

async function initPatient() {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.query(`CREATE TABLE IF NOT EXISTS patient (${patientSchema});`);
  } catch (error) {
    console.error("Patient initialisation error: ", error);
  } finally {
    connection.release();
  }
}

async function initMedicalHistory() {
  let connection;
  try {
    connection = await pool.getConnection();
    await connection.query(`CREATE TABLE IF NOT EXISTS medicalhistory(${medicalhistorySchema});`);
    await connection.query(`CREATE TABLE IF NOT EXISTS medicalhistorysubparams(${miscallenousSchema});`);
  } catch (error) {
    console.log("Medical History initialisation error: ", error);
  } finally {
    connection.release();
  }
}

async function initDoctor(){
    let connection;
    try{
         connection = await pool.getConnection();
        await connection.query(`CREATE TABLE IF NOT EXISTS doctor(${doctorSchema});`);
    }
    catch(error){
        console.error("Doctor initialisation error: ", error);
    }
    finally{
        connection.release();
    }
}

async function initRefreshToken() {
  let connection;
    try{
         connection = await pool.getConnection();
        await connection.query(`CREATE TABLE IF NOT EXISTS doctorrefreshtoken(${doctorrefreshtokenSchema});`);
        await connection.query(`CREATE TABLE IF NOT EXISTS patientrefreshtoken(${patientrefreshtokenSchema});`);
    }
    catch(error){
        console.error("refreshtoken initialisation error: ", error);
    }
    finally{
        connection.release();
    }    
}

async function initPregnancy() {
  let connection;
    try{
         connection = await pool.getConnection();
        await connection.query(`CREATE TABLE IF NOT EXISTS pregnancy(${pregnancySchema});`);
        await connection.query(`CREATE TABLE IF NOT EXISTS measurement(${measurementSchema});`);
    }
    catch(error){
        console.error("pregnancy initialisation error: ", error);
    }
    finally{
        connection.release();
    }  
}

export async function initRelations() {
  await initDB();
  await initPatient();
  await initMedicalHistory();
  await initDoctor();
  await initRefreshToken();
  await initPregnancy();
}
