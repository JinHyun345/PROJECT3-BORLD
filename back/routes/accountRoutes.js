import express from 'express';
import veifyToken from '../middlewares/authMiddleware.js'; // 로그인 여부 확인
import { editAccount } from '../controllers/userController.js';

const router = express.Router();

router.get('/verifyToken', veifyToken, (req, res) => {
  res.json({ user: req.user }); // 인증된 사용자 정보를 응답
});
router.post('/edit', editAccount);


export default router;