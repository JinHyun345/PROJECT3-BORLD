import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Signup from '../pages/Signup';
import Signin from '../pages/Signin';
import Post from '../pages/Post';
import Account from '../pages/Account';
import ChangePassword from '../pages/Change_pw';
import { AuthProvider } from './AuthContexts';
import { ThemeProvider } from './ThemeContexts';


const App = () => {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/post" element={<Post />} />
          <Route path="/account" element={<Account />} />
          <Route path="/account/pw" element={<ChangePassword />} />
        </Routes>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
