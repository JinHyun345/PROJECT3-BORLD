// src/pages/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>BORLD</h1>
      <div>
        <button
          onClick={() => navigate("/signup")}
        >
          Sign up
        </button>
        <button
          onClick={() => navigate("/signin")}
        >
          Sign in
        </button>
      </div>
    </div>
  );
};

export default Home;
