import { DBError } from "../../src/utils/backendError.js";
import { pool } from "../db.js";

export async function getCurrentPregnancy(patient_id) {
  let connection;
  try {
    connection = await pool.getConnection();
    try {
      let query;
      query =
        "SELECT pregnancy_id FROM pregnancy WHERE patient_id = (?) AND deliverydate IS NULL ORDER BY lmp DESC LIMIT 1;";
      const [results] = await connection.query(query, [patient_id]);
      if (results.length > 0) return results[0];
      return false;
    } catch (error) {
      console.log(error);
      return new DBError("Could not add refresh token to DB", error);
    }
  } catch (error) {
    return new DBError("Could not connect to DB", error);
  } finally {
    connection.release();
  }
}
