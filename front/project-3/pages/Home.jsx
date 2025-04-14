// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-8">BORLD</h1>
      <div className="space-x-4">
        <button
          onClick={() => navigate("/signup")}
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Sign up
        </button>
        <button
          onClick={() => navigate("/signin")}
          className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Sign in
        </button>
      </div>
    </div>
  );
};

export default Home;
