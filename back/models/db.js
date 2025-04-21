import db from 'mysql2/promise';

// 커넥션 풀 생성
const pool = db.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,  // 최대 연결 수
  queueLimit: 0         // 대기할 수 있는 연결 수
});

export default pool;

