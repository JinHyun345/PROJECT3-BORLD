import db from '../models/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// 여기에 signup, signin, deleteUser 있읍니다...

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;

  if (!username || !email || !password)
    return res.status(400).json({ error: "모든 정보를 입력해주세요." });

  if (!passwordRegex.test(password))
    return res.status(400).json({ error: "비밀번호 형식이 올바르지 않습니다." });

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (results.length > 0)
      return res.status(400).json({ error: "이미 등록된 이메일입니다." });

    const hashed = await bcrypt.hash(password, 10);
    db.query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [username, email, hashed],
      (err, result) => {
        if (err) return res.status(500).json({ error: "회원가입 실패" });
        res.status(201).json({ message: "회원가입 성공" });
      });
  });
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (results.length === 0)
      return res.status(401).json({ error: "유저를 찾을 수 없습니다." });

    const isMatch = await bcrypt.compare(password, results[0].password);
    if (!isMatch) return res.status(401).json({ error: "비밀번호가 틀렸습니다." });

    const token = jwt.sign({ id: results[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, username: results[0].username });
  });
};

export const deleteUser = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "토큰 없음" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: "유효하지 않은 토큰" });

    db.query("DELETE FROM users WHERE id = ?", [decoded.id], (err, result) => {
      if (result.affectedRows === 0)
        return res.status(404).json({ error: "유저 없음" });

      res.json({ message: "회원 탈퇴 완료" });
    });
  });
};