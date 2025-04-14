import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Signup from '../pages/Signup';
import Signin from '../pages/Signin';
import Post from '../pages/Post';
import "./App.css";
const apiUrl = import.meta.env.VITE_API_URL;

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/post" element={<Post />} />
      </Routes>
    </Router>
  );
};

export default App;
