import mysql from "mysql2/promise";

export const pool = await mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "dixo",
    database: "antenatogram",
    waitForConnections: true,
    queueLimit: 0,
    connectionLimit: 10
})