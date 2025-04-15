import express from 'express';
import { fetchAllPosts, fetchPostById, createNewPost } from '../controllers/postController.js';
import veifyToken from '../middlewares/authMiddleware.js'; // 로그인 여부 확인
import { deleteUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/verifyToken', veifyToken);
router.get('/post', fetchAllPosts);
router.get('/post/:id', fetchPostById);
router.post('/posts', createNewPost);
router.delete('/deleteaccount', deleteUser);

export default router;