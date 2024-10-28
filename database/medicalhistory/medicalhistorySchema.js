import {removeNewLines} from "../utils.js";

const medicalhistorySchema = removeNewLines(
`medicalhistory_id BINARY(16) DEFAULT (UUID_TO_BIN(UUID(),1)) PRIMARY KEY,
patient_id BINARY(16) UNIQUE NOT NULL,
height FLOAT,
bloodgroup VARCHAR(3),
gptal CHAR(5),
lifestylefactors TEXT,
FOREIGN KEY (patient_id) REFERENCES patient(patient_id)`);

const miscallenousSchema = removeNewLines(
`miscallenous_id BINARY(16) DEFAULT (UUID_TO_BIN(UUID(),1)) PRIMARY KEY,
type ENUM ("illness","surgery", "allergy", "medication") NOT NULL,
name TINYTEXT NOT NULL,
description TINYTEXT NOT NULL,
medicalhistory_id BINARY(16) NOT NULL,
FOREIGN KEY (medicalhistory_id) REFERENCES medicalhistory(medicalhistory_id)`);

export { medicalhistorySchema, miscallenousSchema };
