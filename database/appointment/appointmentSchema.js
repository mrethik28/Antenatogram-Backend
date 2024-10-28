import { removeNewLines } from "../utils.js";

export const appointmentSchema = removeNewLines(
`appointment_id BINARY(16) DEFAULT (UUID_TO_BIN(UUID(), 1)) PRIMARY KEY,
pregnancy_id BINARY(16) NOT NULL,
visitdate DATE,
location VARCHAR, 
notes TEXT
`);