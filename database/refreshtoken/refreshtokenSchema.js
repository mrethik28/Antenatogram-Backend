import { removeNewLines } from "../utils.js";

export const doctorrefreshtokenSchema = removeNewLines(
  `
    refreshtoken_id BINARY(16) DEFAULT(UUID_TO_BIN(UUID(),1)) PRIMARY KEY,
    doctor_id BINARY(16),
    token TEXT,
    FOREIGN KEY (doctor_id) REFERENCES doctor(doctor_id)

    `
);
export const patientrefreshtokenSchema = removeNewLines(
  `
    refreshtoken_id BINARY(16) DEFAULT(UUID_TO_BIN(UUID(),1)) PRIMARY KEY, 
    patient_id BINARY(16),
    token TEXT,
    FOREIGN KEY (patient_id) REFERENCES patient(patient_id)

    `
);
