import express from 'express';
import { fetchAllPosts, fetchPostById, createNewPost } from '../controllers/postController.js';
import authMiddleware from '../middlewares/authMiddleware.js'; // 로그인 여부 확인

const router = express.Router();

router.get('/', fetchAllPosts);
router.get('/:id', fetchPostById);
router.post('/', authMiddleware, createNewPost);

export default router;