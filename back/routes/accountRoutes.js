import express from 'express';
import { } from '';
import veifyToken from '../middlewares/authMiddleware.js'; // 로그인 여부 확인

const router = express.Router();

router.get('/verifyToken', veifyToken, (req, res) => {
  res.json({ user: req.user }); // 인증된 사용자 정보를 응답
});
router.get('/account/edit', fetchAllPosts);


export default router;