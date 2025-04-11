const nodemailer = require('nodemailer');

// 인증번호 생성 함수
function generateCode() {
  return Math.floor(100000 + Math.random() * 900000); // 6자리 숫자
}

// 이메일 발송 함수
async function sendVerificationEmail(toEmail) {
  const verificationCode = generateCode();

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // TLS
    auth: {
      user: 'your_email@gmail.com',
      pass: 'your_app_password',
    }
  });
  

  const mailOptions = {
    from: 'isvibe949@gmail.com',
    to: toEmail,
    subject: '📮 인증번호를 확인해주세요!',
    html: `<h2>당신의 인증번호는 <b>${verificationCode}</b>입니다.</h2>`
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('이메일 전송 성공 🎉', info.response);
    return verificationCode;
  } catch (error) {
    console.error('이메일 전송 실패 😢', error);
    throw error;
  }
}

// 사용 예시 (예: /send-email API 안에서)
sendVerificationEmail('isvibe949@gmail.com');
