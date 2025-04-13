import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostList from '../pages/PostList';
import Home from '../pages/Home';
import "./App.css";
const apiUrl = import.meta.env.VITE_API_URL;

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<PostList />} />
      </Routes>
    </Router>
  );
};

export default App;
