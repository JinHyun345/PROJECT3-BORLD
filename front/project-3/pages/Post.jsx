import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../src/AuthContexts';

const Post = () => {
  const navigate = useNavigate();
  const { username } = useAuth();

  const handleAccountClick = () => {
    navigate('/account');
  };

  const handleSignOut = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>BORLD</h1>
      <div>
        {username ? (
          <span>Welcome, {username}</span>  // username이 있을 때만 표시
        ) : (
          <span>Loading...</span> // username이 없으면 Loading 표시
        )}
        <button onClick={handleAccountClick}>My</button>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    </div>
  );
};

export default Post;
