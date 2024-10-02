import {removeNewLines} from "../utils.js";

const medicalhistorySchema = removeNewLines(
`medicalhistory_id BINARY(16) DEFAULT (UUID_TO_BIN(UUID(),1)) PRIMARY KEY,
patient_id BINARY(16),
height FLOAT,
bloodgroup VARCHAR(3),
gptal CHAR(5),
lifestylefactors TEXT,
FOREIGN KEY (patient_id) REFERENCES patient(patient_id)`);

const allergySchema = removeNewLines(
`allergy_id BINARY(16) DEFAULT (UUID_TO_BIN(UUID(),1)) PRIMARY KEY,
allergyname TINYTEXT,
allergydescription TINYTEXT,
medicalhistory_id BINARY(16),
FOREIGN KEY (medicalhistory_id) REFERENCES medicalhistory(medicalhistory_id)`);

const illnessSchema = removeNewLines(
`illness_id BINARY(16) DEFAULT (UUID_TO_BIN(UUID(),1)) PRIMARY KEY,
illnesstype ENUM ("illness","surgery") NOT NULL,
illnessname TINYTEXT NOT NULL,
illnessdescription TINYTEXT NOT NULL,
medicalhistory_id BINARY(16) NOT NULL,
FOREIGN KEY (medicalhistory_id) REFERENCES medicalhistory(medicalhistory_id)`);

const medicationSchema = removeNewLines(
`medication_id BINARY(16) DEFAULT (UUID_TO_BIN(UUID(),1)) PRIMARY KEY,
medicationname TINYTEXT  NOT NULL,
meicationdescription TINYTEXT  NOT NULL,
medicalhistory_id BINARY(16)  NOT NULL,
FOREIGN KEY (medicalhistory_id) REFERENCES medicalhistory(medicalhistory_id)`);

export { medicalhistorySchema, allergySchema, illnessSchema, medicationSchema };
