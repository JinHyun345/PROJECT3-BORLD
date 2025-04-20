import db from '../models/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// 여기에 signup, signin, deleteUser, editAccount 있읍니다...

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
    if (!isMatch) return res.status(401).json({ error: "비밀번호가 확인해주세요" });

    const token = jwt.sign({ id: results[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, id: results[0].id, username: results[0].username });
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

export const editAccount = async (req, res) => {
  const { id, username, email } = req.body;
  db.query("UPDATE users SET username=?, email=? WHERE id=?", [username, email, id], async (err, results1) => {
    if (err) return res.status(500).json({ error: "데이터베이스 에러", details: err });

    // affectedRows로 실제로 수정된 데이터가 있는지 확인할 수도 있어
    if (results1.affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    db.query("SELECT * from users WHERE id=?", [id], async (err, results2) => {
      if (err) return res.status(500).json({ error: "데이터 조회 에러", datails: err })
      const users = results2[0];
      if (!users) {
        return res.status(404).json({ error: "수정 후 유저 사라짐" });
      }
      return res.status(200).json({ username: users.username, email: users.email });
    });
  });
};

export const changePassword = async (req, res) => {
  const {password, newPassword } = req.body;
  const id = req.user.id;
  console.log(id);
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;

  if (!newPassword || !password)
    return res.status(400).json({ error: "모든 정보를 입력해주세요." });
  if (typeof id !== 'number' || id<1 || id > 100000) {
    return res.status(400).json({ error: "잘못된 사용자 ID입니다." });
  }

  db.query("SELECT * from users WHERE id=?", [id], async (err, user) => {
    if (err) return res.status(500).json({ error: "데이터 조회 에러", datails: err })
    const foundUser = user[0];
    const isSame = await bcrypt.compare(newPassword, foundUser.password);
    if (isSame) {
      return res.status(400).json({ error: "기존 비밀번호와 다른 비밀번호를 사용해주세요." });
    }
    if (!foundUser) {
      return res.status(404).json({ error: "존재하지 않는 유저입니다." });
    }
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: '현재 비밀번호가 일치하지 않습니다.' });
    }
    if (!passwordRegex.test(newPassword))
      return res.status(400).json({ error: "새 비밀번호는 영문, 숫자, 특수문자를 포함하여 10자 이상이어야 합니다." });
    const hashed = await bcrypt.hash(newPassword, 10);

    db.query("UPDATE users SET password=? WHERE id=?", [hashed, id], async (err, results) => {
      if (err) return res.status(500).json({ error: "데이터베이스 에러", details: err });
      return res.status(200).json({ message: '비밀번호가 변경되었습니다. 다시 로그인해주세요.' })
    });
  });
};

