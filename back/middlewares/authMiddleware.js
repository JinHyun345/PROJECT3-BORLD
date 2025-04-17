import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "토큰 없음" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: "유효하지 않은 토큰" });

    req.user = decoded; // 이후 라우트에서 req.user.id 로 사용 가능
    next();
  });
};

export default verifyToken;