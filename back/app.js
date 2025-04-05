import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import authRoutes from './routes/authRoutes.js';
import verificationRoutes from './routes/verificationRoutes.js';
import db from './models/db.js';

const app = express();
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use(cors({
  origin: "https://www.mytestapp.space/",
  credentials: true
}));

// DB 연결
db.connect(err => {
  if (err) console.error("❌ MySQL 연결 실패:", err);
  else console.log("✅ MySQL 연결 성공!");
});

// 라우터 연결
app.use('/auth', authRoutes);
app.use('/verify', verificationRoutes);

export default app;
