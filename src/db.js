import mysql from 'mysql2/promise';

export const pool = mysql.createPool(process.env.MYSQL_URL);
