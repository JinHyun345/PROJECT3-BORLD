import express from 'express';
import { signup, signin, deleteUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.delete('/delete', deleteUser);

export default router;
