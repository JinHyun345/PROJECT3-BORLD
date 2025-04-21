import express from 'express';
import session from 'express-session';
import cors from 'cors';
import 'dotenv/config';
import index from './routes/index.js'
import signinRoutes from './routes/signinRoutes.js';
import signupRoutes from './routes/signupRoutes.js';
import postRoutes from './routes/postRoutes.js';
import accountRoutes from './routes/accountRoutes.js';

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

// 라우터 연결
app.use('/', index);  // 홈 라우터 (메인 페이지)
app.use('/signup', signupRoutes);  // /signup 경로에 signupRoutes 처리
app.use('/signin', signinRoutes);  // /signin 경로에 signinRoutes 처리
app.use('/posts', postRoutes);  // /posts 경로에 postRoutes 처리
app.use('/account', accountRoutes);  // /account 경로에 accountRoutes 처리



export default app;
