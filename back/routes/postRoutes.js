import express from 'express';
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware'); // 로그인 여부 확인

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.post('/', authMiddleware, postController.createPost);

module.exports = router;
