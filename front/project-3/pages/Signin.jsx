import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../src/AuthContexts";
const apiUrl = import.meta.env.VITE_API_URL;

const Signin = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();
    const response = await fetch(`${apiUrl}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok && data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
  
      signIn(data.id, data.username, email);

      alert("로그인에 성공했습니다!");
      setPassword("");
      navigate('/post');
    } else {
      alert(data.error);
    }
  };

  return (
    <div>
        <form onSubmit={handleSignin}>
          <h2>Sign In</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Sign in</button>
          <button type="button" onClick={() => {setEmail(""); setPassword(""); navigate('/');}}>Back</button>
        </form>
    </div>
  );

};
export default Signin;

