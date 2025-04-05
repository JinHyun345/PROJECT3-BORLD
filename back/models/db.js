import mysql from 'mysql2';

const db = mysql.createConnection({
  host: process.env.DB_HOST,       // ex) 'aws.connect.psdb.io'
  user: process.env.DB_USER,       // ex) 'admin'
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306, // 보통 기본 포트지만 명시해주는 게 좋아
  ssl: {
    rejectUnauthorized: true,      // PlanetScale 등 일부 서비스에서 필요
  }
});

export default db;

// models/는 DB관련 작업 담당