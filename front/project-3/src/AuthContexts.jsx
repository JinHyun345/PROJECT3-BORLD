import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(null); // user = { username: 'Isen' }
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);  // 초기화 시 localStorage에서 username 가져오기
    }
  }, []);
  const signIn = (username) => {
    console.log('로그인 중! 이름은:', username);
    setUsername(username);
  };

  const signOut = () => {
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ username, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
