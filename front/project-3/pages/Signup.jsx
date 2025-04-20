import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from "../src/ThemeContexts";

const apiUrl = import.meta.env.VITE_API_URL;

const Signup = () => {
  const { darkMode, setDarkMode } = useTheme();
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
    setEmail("");
    setUsername("");
    setPassword("");
    setPasswordcheck("");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col items-center justify-center text-black dark:text-white transition-colors duration-500">
      <div className="w-full max-w-sm p-8 bg-white dark:bg-black rounded-lg shadow-lg space-y-6">
        <h2 className="text-3xl font-bold tracking-wide font-inter text-center">Sign Up</h2>

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-black dark:border-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 border border-black dark:border-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-black dark:border-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
          />
          <input
            type="password"
            placeholder="Rewrite the Password"
            value={passwordcheck}
            onChange={(e) => setPasswordcheck(e.target.value)}
            className="w-full p-3 border border-black dark:border-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
          />

          <button
            type="submit"
            className="w-full px-6 py-2 border border-black dark:border-white text-black dark:text-white font-medium rounded-md shadow-xl hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
          >
            Sign Up
          </button>

          <button
            type="button"
            onClick={() => {
              setUsername("");
              setEmail("");
              setPassword("");
              navigate("/");
            }}
            className="w-full px-6 py-2 border border-gray-400 text-gray-600 dark:border-gray-400 dark:text-gray-200 font-medium rounded-md shadow-xl hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-300"
          >
            Back
          </button>
        </form>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="mt-6 px-4 py-2 text-sm border border-gray-400 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition"
        >
          {darkMode ? "🌞" : "🌙"}
        </button>
      </div>
    </div>

  );

};
export default Signup;

