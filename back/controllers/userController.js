import pool from '../models/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// 회원가입
export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;

  if (!username || !email || !password)
    return res.status(400).json({ error: "모든 정보를 입력해주세요." });

  if (!passwordRegex.test(password))
    return res.status(400).json({ error: "비밀번호 형식이 올바르지 않습니다." });

  try {
    const [results] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);
    if (results.length > 0)
      return res.status(400).json({ error: "이미 등록된 이메일입니다." });

    const hashed = await bcrypt.hash(password, 10);
    await pool.execute("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [username, email, hashed]);

    res.status(201).json({ message: "회원가입 성공" });
  } catch (err) {
    res.status(500).json({ error: "회원가입 실패", details: err.message });
  }
};

// 로그인
export const signin = async (req, res) => {
  console.log('로그인 요청 들어옴', req.body);
  const { email, password } = req.body;

  try {
    const [results] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);
    if (results.length === 0)
      return res.status(401).json({ error: "유저를 찾을 수 없습니다." });

    const isMatch = await bcrypt.compare(password, results[0].password);
    if (!isMatch) return res.status(401).json({ error: "비밀번호가 확인해주세요" });

    const token = jwt.sign({ id: results[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, id: results[0].id, username: results[0].username });
  } catch (err) {
    res.status(500).json({ error: "로그인 실패", details: err.message });
  }
};

// 유저 삭제
export const deleteUser = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "토큰 없음" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const [result] = await pool.execute("DELETE FROM users WHERE id = ?", [decoded.id]);
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "유저 없음" });

    res.json({ message: "회원 탈퇴 완료" });
  } catch (err) {
    res.status(403).json({ error: "유효하지 않은 토큰", details: err.message });
  }
};

// 계정 수정
export const editAccount = async (req, res) => {
  const { id, username, email } = req.body;

  try {
    const [results1] = await pool.execute("UPDATE users SET username=?, email=? WHERE id=?", [username, email, id]);

    if (results1.affectedRows === 0)
      return res.status(404).json({ error: "User not found" });

    const [results2] = await pool.execute("SELECT * FROM users WHERE id=?", [id]);
    const user = results2[0];

    if (!user)
      return res.status(404).json({ error: "수정 후 유저 사라짐" });

    res.status(200).json({ username: user.username, email: user.email });
  } catch (err) {
    res.status(500).json({ error: "데이터베이스 에러", details: err.message });
  }
};

// 비밀번호 변경
export const changePassword = async (req, res) => {
  const { password, newPassword } = req.body;
  const id = req.user.id;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;

  if (!newPassword || !password)
    return res.status(400).json({ error: "모든 정보를 입력해주세요." });

  if (typeof id !== 'number' || id < 1 || id > 100000)
    return res.status(400).json({ error: "잘못된 사용자 ID입니다." });

  try {
    const [userResults] = await pool.execute("SELECT * FROM users WHERE id=?", [id]);
    const foundUser = userResults[0];

    if (!foundUser)
      return res.status(404).json({ error: "존재하지 않는 유저입니다." });

    const isSame = await bcrypt.compare(newPassword, foundUser.password);
    if (isSame)
      return res.status(400).json({ error: "기존 비밀번호와 다른 비밀번호를 사용해주세요." });

    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch)
      return res.status(401).json({ message: '현재 비밀번호가 일치하지 않습니다.' });

    if (!passwordRegex.test(newPassword))
      return res.status(400).json({ error: "새 비밀번호는 영문, 숫자, 특수문자를 포함하여 10자 이상이어야 합니다." });

    const hashed = await bcrypt.hash(newPassword, 10);
    await pool.execute("UPDATE users SET password=? WHERE id=?", [hashed, id]);

    res.status(200).json({ message: '비밀번호가 변경되었습니다. 다시 로그인해주세요.' });
  } catch (err) {
    res.status(500).json({ error: "데이터베이스 에러", details: err.message });
  }
};
