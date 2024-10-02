import { removeNewLines } from "../utils.js";

export const doctorSchema = removeNewLines(
    `
    doctor_id BINARY(16) DEFAULT (UUID_TO_BIN(UUID(), 1)) PRIMARY KEY,
    name TINYTEXT,
    email VARCHAR(319) UNIQUE NOT NULL,
    gender CHAR(1),
    phonenumber TINYINT(10),
    dateofbirth DATE,
    addressline1 TINYTEXT,
    city TINYTEXT,
    state TINYTEXT,
    pincode CHAR(6),
    aadharnumber CHAR(12)
    `);