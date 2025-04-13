import express from 'express';
import session from 'express-session';
import cors from 'cors';
import 'dotenv/config';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';
import verificationRoutes from './routes/verificationRoutes.js';
import db from './models/db.js';

const app = express();
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));
app.use(express.json());
app.use(cors({
  origin: `${process.env.CORS_ORIGIN}`,
  credentials: true
}));

// DB 연결
db.connect(err => {
  if (err) console.error("❌ MySQL 연결 실패:", err);
  else console.log("✅ MySQL 연결 성공!");
});

// 라우터 연결
app.use('/auth', authRoutes);
app.use('/posts', postRoutes);
app.use('/verification', verificationRoutes);

export default app;
