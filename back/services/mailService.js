import Mailgun from "mailgun.js";
import FormData from "form-data";
import mailgunConfig from "../config/mailgun.js";

const mailgun = new Mailgun(FormData);
const mg = mailgun.client(mailgunConfig);

export async function sendVerificationEmail(email, code) {
  try {
    await mg.messages.create(process.env.MAILGUN_DOMAIN, {
      from: `BORLD <${process.env.SENDER_EMAIL}>`,
      to: email,
      subject: "Project3 BORLD 인증 코드",
      text: `인증번호: ${code}`
    });
    return true;
  } catch (err) {
    console.error("이메일 전송 실패:", err);
    return false;
  }
}
