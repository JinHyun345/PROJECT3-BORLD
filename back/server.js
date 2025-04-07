import app from './app.js';
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ 서버 실행 중! 포트는 ${PORT}`);
});