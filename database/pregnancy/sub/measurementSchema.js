import { removeNewLines } from "../../utils.js";

export const measurementSchema = removeNewLines(
`measurement_id BINARY(16) DEFAULT (UUID_TO_BIN(UUID(), 1)) PRIMARY KEY,
pregnancy_id BINARY(16) NOT NULL,
type ENUM('weight', 'bloodsugar', 'temperature', 'bloodpressure', 'hc', 'ac', 'fl', 'bpd'),
date DATETIME,
value DECIMAL(5,2) NOT NULL,
value2 DECIMAL(5,2),
FOREIGN KEY (pregnancy_id) REFERENCES pregnancy(pregnancy_id)`);    