import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(null); // user = { username: 'Isen' }
  const [email, setEmail] = useState(null);
  
  const user = { username, email };
  
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);  // 초기화 시 localStorage에서 username 가져오기
    }
  }, []);
  const signIn = (username, email) => {
    setEmail(email);
    setUsername(username);
  };

  const signOut = () => {
    setUsername(null);
  };
  
  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
