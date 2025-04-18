import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../src/AuthContexts';

const Post = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSignOut = () => {
    localStorage.removeItem("token"); 
    navigate('/');
  };

  return (
    <div>
      <h1>BORLD</h1>
      <div>
        {user.username ? (
          <span>Welcome, {user.username}</span>  // username이 있을 때만 표시
        ) : (
          <span>Loading...</span> // username이 없으면 Loading 표시
        )}
        <button onClick={()=> navigate('/account')}>My</button>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    </div>
  );
};

export default Post;
