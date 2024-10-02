import { removeNewLines } from "../utils.js";

export const patientSchema = removeNewLines(
`patient_id BINARY(16) DEFAULT (UUID_TO_BIN(UUID(), 1)) PRIMARY KEY,
name TINYTEXT,
email VARCHAR(319) UNIQUE NOT NULL,
phonenumber CHAR(10),
dateofbirth DATE,
addressline1 TINYTEXT,
city TINYTEXT,
state TINYTEXT,
pincode CHAR(6),
aadharnumber CHAR(12),
nomineename TINYTEXT,
nomineephonenumber TINYINT(10),
passwordhash VARCHAR(60) NOT NULL`);