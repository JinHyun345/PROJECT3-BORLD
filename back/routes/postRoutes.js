import express from 'express';
import { fetchAllPosts, createNewPost } from '../controllers/postController.js';
import verifyToken from '../middlewares/authMiddleware.js'; // 로그인 여부 확인
import { deleteUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/verifyToken', verifyToken, (req, res) => {
  res.json({ user: req.user }); // 인증된 사용자 정보를 응답
});
router.get('/', fetchAllPosts);
router.get('/:id');
router.post('/add', verifyToken, createNewPost);

export default router;