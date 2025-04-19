import express from 'express';
import { changePassword, editAccount } from '../controllers/userController.js';
import verifyToken from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/verifyToken', verifyToken, (req, res) => {
  res.json({ user: req.user }); // 인증된 사용자 정보를 응답
});
router.post('/edit', editAccount);
router.post('/changepw', verifyToken, changePassword);


export default router;