import { removeNewLines } from "../utils.js";

export const pregnancySchema = removeNewLines(
`pregnancy_id BINARY(16) DEFAULT (UUID_TO_BIN(UUID(), 1)) PRIMARY KEY,
patient_id BINARY(16) NOT NULL,
glucosetolerance DECIMAL(5,2),
hba1c DECIMAL(3,2),
lmp DATE,
edd DATE,
ivf varchar(255),
ivfdating DATE,
ultrasounddating DATE,
deliverydate DATE,
FOREIGN KEY (patient_id) REFERENCES patient(patient_id)`);