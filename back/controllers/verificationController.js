import db from '../models/db.js';
import { sendVerificationEmail } from '../services/mailService.js';

export const sendCode = async (req, res) => {
  const { email } = req.body;
  const code = Math.floor(100000 + Math.random() * 900000);

  db.query(`INSERT INTO verification_codes (email, code) VALUES (?, ?) 
            ON DUPLICATE KEY UPDATE code = ?, created_at = CURRENT_TIMESTAMP`,
    [email, code, code], async (err, result) => {
      if (err) return res.status(500).json({ error: "DB 오류" });

      const success = await sendVerificationEmail(email, code);
      if (success) res.json({ message: "인증번호 전송 완료" });
      else res.status(500).json({ error: "이메일 전송 실패" });
    });
};

export const verifyCode = (req, res) => {
  const { email, code } = req.body;
  db.query("SELECT code, created_at FROM verification_codes WHERE email = ?", [email], (err, results) => {
    if (results.length === 0) return res.status(400).json({ error: "이메일 없음" });

    const { code: storedCode, created_at } = results[0];
    const isValidTime = (new Date() - new Date(created_at)) / 60000 <= 10;

    if (storedCode === code && isValidTime) {
      res.json({ message: "인증 성공" });
    } else {
      res.status(400).json({ error: "인증 실패" });
    }
  });
};
// controllers/는 요청 처리 로직 실행