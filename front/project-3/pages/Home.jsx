import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;

const Home = () => {
  const [view, setView] = useState("buttons"); // 상태: "buttons", "signup", "signin", "signout"
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordcheck, setPasswordcheck] = useState("");

  const navigate = useNavigate();


  //페이지 로드할 때 로그인 상태 확인해야함
  useEffect(() => {
    const token = localStorage.getItem("token");
    const signinusername = localStorage.getItem("username");

    if (token && signinusername) {
      setUsername(signinusername);
      setView("buttons"); // 로그인 상태로 버튼을 변경
    }
  }, []);

  const handleSignin = async (e) => {
    e.preventDefault();
    const response = await fetch(`${apiUrl}/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    console.log("Response Data:", data);
    if (response.ok && data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);

      alert("로그인에 성공했습니다!");
      setView("buttons");
      setUsername(data.username);
      setEmail("");
      setPassword("");
      setPasswordcheck("");
      navigate('/posts');
    } else {
      alert("비밀번호를 확인해주세요");
    }
  };

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
      const response = await fetch(`${apiUrl}/auth/signup`, {
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

  const handleSignOut = () => {
    const confirmed = window.confirm("sign out 하시겠습니까?");
    if(!confirmed) return;
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUsername("");
    setView("buttons");
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm("정말 계정을 삭제하시겠습니까? 계정 삭제 시 계정에 관한 모든 정보가 삭제됩니다.");
    if(!confirmed) return;

    const token = localStorage.getItem("token");

    if (!token) {
      alert("로그인 후 탈퇴할 수 있습니다.");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/auth/delete`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`  // 토큰을 Authorization 헤더에 첨부
        },
      });

      const data = await response.json();
      if (response.ok) {
        alert("회원 탈퇴가 완료되었습니다.");
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setUsername("");
        setView("buttons");  // 탈퇴 후 로그인 화면으로 돌아가기
      } else {
        alert(data.error || "회원 탈퇴에 실패했습니다.");
      }
    } catch (error) {
      console.error("회원 탈퇴 에러:", error);
      alert("서버 오류가 발생했습니다.");
    }
  };

  const handleBorld = ()=>{

  }
  return (
    <div className="auth-container">
      {localStorage.getItem("token") ? (
        <div>
          <h2>hello {username}님</h2>
          <button onClick={handleSignOut}>Sign Out</button>
          <button onClick={handleDeleteAccount}>Delete Account</button>
        </div>
      ) : (
        <>
          {view === "buttons" && (
            <div>
              <button onClick={() => setView("signup")}>Sign Up</button>
              <button onClick={() => setView("signin")}>Sign In</button>
            </div>
          )}
        </>
      )
      }
      {view === "signup" && (
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
            <button onClick={() => { setView("buttons"); setEmail(""); setPassword(""); }}>Back</button>
          </form>
        </div>
      )}

      {view === "signin" && (
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
          <button onClick={() => { setView("buttons"); setEmail(""); setPassword(""); }}>Back</button>
        </form>
      )}
    </div>
  );

};
export default Home;

