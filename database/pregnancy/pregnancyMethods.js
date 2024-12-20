import { DBError } from "../../src/utils/Errors.js";
import { pool } from "../db.js";

export async function getCurrentPregnancy(patientID) {
  let connection;
  try {
    connection = await pool.getConnection();
    try {
      let query;
      query =
        "SELECT *, BIN_TO_UUID(pregnancy_id) AS pregnancyID  FROM pregnancy WHERE patient_id = UUID_TO_BIN(?) AND deliverydate IS NULL ORDER BY lmp DESC LIMIT 1;";
      const [results] = await connection.query(query, [patientID]);
      if (results.length > 0) return results[0];
      return false;
    } catch (error) {
      console.log(error);
      return new DBError("Could not fetch pregnancyid", error);
    }
  } catch (error) {
    return new DBError("Could not connect to DB", error);
  } finally {
    connection.release();
  }
}

export async function newPregnancy(patientID) {
  let connection;
  try {
    connection = await pool.getConnection();
    try {
      let query;
      query = "INSERT INTO pregnancy (patient_id) values (UUID_TO_BIN(?)); ";
      const [results] = await connection.query(query, [patientID]);
      if (results.affectedRows === 1) return await getCurrentPregnancy(patientID);
      return false;
    } catch (error) {
      console.log(error);
      return new DBError("Could not add pregnancy", error);
    }

  } catch (error) {
    return new DBError("Could not connect to DB", error);
  } finally {
    connection.release();
  }
}
