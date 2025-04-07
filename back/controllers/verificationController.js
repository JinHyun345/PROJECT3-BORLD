import db from '../models/db.js';
import { generateCode } from '../utils/generateCode.js';
import postmark from 'postmark';

const client = new postmark.ServerClient(process.env.POSTMARK_API_TOKEN);

export const sendVerificationCode = async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: '이메일이 필요합니다' });

  const code = generateCode();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5분 후

  try {
    // 기존 코드 삭제 (동일 이메일)
    await db.promise().query(`DELETE FROM verification_codes WHERE email = ?`, [email]);

    // 새 인증번호 저장
    await db.promise().query(
      `INSERT INTO verification_codes (email, code, expires_at) VALUES (?, ?, ?)`,
      [email, code, expiresAt]
    );

    // Postmark로 메일 전송
    await client.sendEmail({
      From: process.env.EMAIL_SENDER,
      To: email,
      Subject: '당신의 인증번호가 도착했습니다 🔐',
      HtmlBody: `<h2>인증번호: <strong>${code}</strong></h2><p>5분 안에 입력해주세요.</p>`,
      TextBody: `인증번호: ${code} (5분 안에 입력해주세요)`,
      MessageStream: 'outbound',
    });

    res.status(200).json({ message: '인증번호가 전송되었습니다.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버 오류', error: err });
  }
};

// 2. 인증번호 확인
export const verifyCode = async (req, res) => {
  const { email, code } = req.body;

  if (!email || !code) return res.status(400).json({ message: '이메일과 인증번호 모두 필요합니다.' });

  try {
    const [rows] = await db.promise().query(
      `SELECT * FROM verification_codes WHERE email = ? ORDER BY created_at DESC LIMIT 1`,
      [email]
    );

    const record = rows[0];
    if (!record) return res.status(404).json({ message: '인증기록 없음' });

    if (record.code !== code) return res.status(401).json({ message: '인증번호 틀림' });

    if (new Date(record.expires_at) < new Date()) return res.status(410).json({ message: '인증번호 만료됨' });

    // 성공 → 사용 후 삭제
    await db.promise().query(`DELETE FROM verification_codes WHERE email = ?`, [email]);

    res.status(200).json({ message: '인증 성공!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버 오류', error: err });
  }
};