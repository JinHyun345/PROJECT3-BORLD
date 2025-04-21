import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../src/AuthContexts';
import { useTheme } from "../src/ThemeContexts";


const apiUrl = import.meta.env.VITE_API_URL;


function PostAdd() {
  const { user } = useAuth();
  const { darkMode, setDarkMode } = useTheme();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [hashtags, setHashtags] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    const res = await fetch(`${apiUrl}/posts/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`, // 인증 필요 시
      },
      body: JSON.stringify({
        title,
        content,
        hashtags,
        user_id: user.id,
      }),
    });

    if (res.ok) {
      alert('게시글이 등록되었습니다!');
      navigate('/post');
    } else {
      const data = await res.json();
      alert(`실패: ${data.error}`);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black flex flex-col items-center justify-center text-black dark:text-white transition-colors duration-500">
      <button
        onClick={() => navigate('/post')}
        className="px-3 py-1 border border-gray-400 text-gray-600 dark:border-gray-400 dark:text-gray-200 font-medium rounded-md shadow-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
      >
        Back
      </button>
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">✍️ 새 글 작성</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border rounded bg-white text-gray-900 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
          required
        />
        <textarea
          placeholder="내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 h-40 border rounded bg-white text-gray-900 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
          required
        />
        <input
          type="text"
          placeholder="#해시태그 (쉼표로 구분)"
          value={hashtags}
          onChange={(e) => setHashtags(e.target.value)}
          className="w-full p-3 border rounded bg-white text-gray-900 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-500 transition"
        >
          작성 완료
        </button>
      </form>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="mt-6 px-4 py-2 text-sm border border-gray-400 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition"
      >
        {darkMode ? "🌞" : "🌙"}
      </button>
    </div>
  );
}

export default PostAdd;
