import express from 'express';
import { sendCode, verifyCode } from '../controllers/verificationController.js';
const router = express.Router();

router.post('/send-code', sendCode);
router.post('/verify-code', verifyCode);

export default router;
// URL에 따른 요청 연결
