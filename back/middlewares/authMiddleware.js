const authMiddleware = (req, res, next) => {
    if (!req.session || !req.session.user) {
      return res.status(401).json({ message: '인증이 필요합니다.' });
    }
  
    req.user = req.session.user; // 또는 JWT 디코딩한 유저 정보
    next();
  };
  
  export default authMiddleware;