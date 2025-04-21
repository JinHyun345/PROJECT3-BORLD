import { useEffect, useState, React } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../src/AuthContexts';
import { useTheme } from "../src/ThemeContexts";
import { Link } from 'react-router-dom';


const apiUrl = import.meta.env.VITE_API_URL;


const Post = () => {
  const { darkMode, setDarkMode } = useTheme();
  const [posts, setPosts] = useState([]);

  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    console.log(user);

    const fetchPosts = async () => {
      try {
        const response = await fetch(`${apiUrl}/posts`);
        if (!response.ok) {
          throw new Error(`HTTP error! 상태: ${response.status}`);
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('게시글 불러오기 실패:', error);
      }
    };
    fetchPosts();
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col items-center justify-center text-black dark:text-white transition-colors duration-500">
      <div className="w-full max-w-lg p-12 bg-white dark:bg-black rounded-lg shadow-lg space-y-8 text-center">
        <h1 className="text-4xl font-bold tracking-wide font-inter mb-6">BORLD</h1>

        <div className="space-y-6">
          {user.username ? (
            <span className="text-xl font-medium">Welcome, <span className="font-semibold">{user.username}</span></span>
          ) : (
            <span className="text-xl text-gray-500 dark:text-gray-400">Loading...</span>
          )}
          <div></div>
          <div className="flex justify-center space-x-6">
            <button
              onClick={() => navigate('/account')}
              className="px-8 py-3 border border-black dark:border-white text-black dark:text-white font-medium rounded-md shadow-xl hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
            >
              My Account
            </button>

            <button
              onClick={handleSignOut}
              className="px-8 py-3 border border-gray-400 text-gray-600 dark:border-gray-400 dark:text-gray-200 font-medium rounded-md shadow-xl hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-300"
            >
              Sign Out
            </button>
          </div>
          <div className="mt-8 space-y-4">
            {/* 글쓰기 버튼 */}
            <button
              onClick={() => navigate('/post/add')} // 글쓰기 페이지로 이동
              className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300"
            >
              ✍️ 새 글 작성
            </button>
            {/* 게시글 목록 출력 영역 */}
            <div className="space-y-4">
              {posts && posts.length > 0 ? (
                posts.map((post) => (
                  <Link
                    key={post.id}
                    to={`/post/${post.uuid}`}
                    className="block border border-gray-300 dark:border-gray-600 p-4 rounded-md shadow-sm hover:shadow-md transition"
                  >
                    <h2 className="text-lg font-bold">{post.title}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">by {post.username}</p>
                  </Link>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400">게시글이 없습니다.</p>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="mt-6 px-4 py-2 text-sm border border-gray-400 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition"
        >
          {darkMode ? "🌞" : "🌙"}
        </button>
      </div>
    </div>
  );
};

export default Post;
