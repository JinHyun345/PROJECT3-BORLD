import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordcheck, setPasswordcheck] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!username || !email || !password) {
      alert("프론트:모든 정보를 입력해주세요!");
      return;
    }

    if (!passwordRegex.test(password)) {
      alert("프론트:비밀번호는 영문, 숫자, 특수문자를 포함하여 10자 이상이어야 합니다.");
      return;
    }
    if (password !== passwordcheck) {
      alert("비밀번호를 정확하게 입력해주세요.");
      return;
    }
    try {
      const response = await fetch(`${apiUrl}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("프론트: 회원가입 성공!");
      } else {
        alert(data.error || "프론트:회원가입에 실패했습니다.");
      }
    } catch (error) {
      console.error("React : Signup error:", error);
      alert("React:An error occurred. Please try again.");
    }
    setView("buttons"); // 초기 화면으로 돌아가기
    setEmail("");
    setUsername("");
    setPassword("");
    setPasswordcheck("");
  };

  return (
    <div className="auth-container">
        <div>
          <h2>Sign Up</h2>
          <form onSubmit={handleSignup}>
            <input
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="rewrite the Password"
              value={passwordcheck}
              onChange={(e) => setPasswordcheck(e.target.value)}
            />
            <button type="submit">Sign Up</button>
            <button type="button" onClick={() => {setUsername(""); setEmail(""); setPassword(""); navigate('/');}}>Back</button>
          </form>
        </div>
    </div>
  );

};
export default Signup;

