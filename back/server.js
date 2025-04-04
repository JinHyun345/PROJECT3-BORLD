import app from './app.js';
const port = 5000;

app.listen(port, () => {
  console.log(`✅ 서버 실행 중! 포트: ${port}`);
});
