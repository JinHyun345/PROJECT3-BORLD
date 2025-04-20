import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../src/AuthContexts";
import { useTheme } from "../src/ThemeContexts";

const apiUrl = import.meta.env.VITE_API_URL;

const Signin = () => {
  const { signIn } = useAuth();
  const { darkMode, setDarkMode } = useTheme();
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
    <div className="min-h-screen bg-white dark:bg-black flex flex-col items-center justify-center space-y-6 text-black dark:text-white transition-colors duration-500">
      <h2 className="text-4xl font-bold tracking-wide font-inter">Sign In</h2>

      <form onSubmit={handleSignin} className="flex flex-col space-y-4 w-full max-w-sm p-6 bg-white dark:bg-black rounded-lg shadow-lg">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-black dark:border-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-black dark:border-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
        />

        <button
          type="submit"
          className="w-full px-6 py-2 border border-black dark:border-white text-black dark:text-white font-medium rounded-md shadow-xl hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
        >
          Sign in
        </button>
        <button
          type="button"
          onClick={() => { setEmail(""); setPassword(""); navigate("/"); }}
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
  );

};
export default Signin;

