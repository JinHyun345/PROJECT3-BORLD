// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../src/ThemeContexts";

const Home = () => {
  const { darkMode, setDarkMode } = useTheme();

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col items-center justify-center space-y-6 text-black dark:text-white transition-colors duration-500">
      <h1 className="text-5xl font-bold tracking-wide font-inter">BORLD</h1>

      <div className="flex space-x-4">
        <button
          onClick={() => navigate("/signup")}
          className="px-6 py-2 border border-black dark:border-white text-black dark:text-white font-medium rounded-md shadow-xl hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
        >
          Sign up
        </button>

        <button
          onClick={() => navigate("/signin")}
          className="px-6 py-2 border border-black dark:border-white text-black dark:text-white font-medium rounded-md shadow-xl hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
        >
          Sign in
        </button>
      </div>

      <button
        onClick={() => setDarkMode(!darkMode)}
        className="mt-6 px-4 py-2 text-sm border border-gray-400 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition"
      >
        {darkMode ? "🌞" : "🌙"}
      </button>
    </div>


  );
};

export default Home;
