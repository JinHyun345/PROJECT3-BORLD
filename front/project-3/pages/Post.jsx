import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_URL;

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch(`${apiUrl}/verifyToken`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('인증 필요!');
        return res.json();
      })
      .then(data => setPosts(data))
      .catch(err => console.error(err));
  }, []);

  // 게시글 목록 불러오기
  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${apiUrl}/post`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!res.ok) throw new Error("인증 필요!");
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("글 불러오기 에러", err);
    }
  };
  // 글 작성
  const handlePosts = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${apiUrl}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ title, content }),
      });
      if (res.ok) {
        setTitle('');
        setContent('');
        fetchPosts();
      }
    } catch (err) {
      console.error("글 작성 실패", err);
    }
  };
  const handleDelete = async (id) => {
    const confirmed = window.confirm("삭제할까요?");
    if (!confirmed) return;

    try {
      await fetch(`${apiUrl}/post/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
      });
      fetchPosts();
    } catch (err) {
      console.error("삭제 실패", err);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("token"); // 토큰 삭제
    navigate('/login'); // 로그인 페이지로
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm("정말 탈퇴하시겠어요?");
    if (!confirmed) return;

    try {
      const res = await fetch(`${apiUrl}/users/me`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.ok) {
        localStorage.removeItem("token");
        alert("계정이 삭제되었습니다.");
        navigate('/signup'); // 또는 /login
      } else {
        alert("탈퇴 실패");
      }
    } catch (err) {
      console.error("탈퇴 에러", err);
    }
  };
  
  return (
    <div className="flex gap-6 p-4">
      {/* 게시글 목록 */}
      <div className="w-1/2">
        <div className="mb-4 flex gap-2">
          <button onClick={handleSignOut} className="bg-gray-200 px-3 py-1 rounded">Sign out</button>
          <button onClick={handleDeleteAccount} className="bg-red-200 px-3 py-1 rounded">Delete Account</button>
          <button onClick={() => setShowForm(prev => !prev)} className="bg-blue-200 px-3 py-1 rounded">
            {showForm ? "작성 취소" : "글쓰기"}
          </button>
        </div>

        <h2 className="text-xl font-bold mb-2">게시글 목록</h2>
        <ul className="space-y-4">
          {posts.map(post => (
            <li key={post.id} className="border p-3 rounded shadow">
              <strong className="text-lg">{post.title}</strong>
              <p className="text-gray-700">{post.body}</p>
              <button onClick={() => handleDelete(post.id)} className="text-sm text-red-500 mt-1">삭제</button>
            </li>
          ))}
        </ul>
      </div>

      {/* 글쓰기 폼 */}
      {showForm && (
        <div className="w-1/2 border p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">새 게시글 작성</h3>
          <form onSubmit={handlePosts} className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="제목"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border p-2 rounded"
            />
            <textarea
              placeholder="내용"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border p-2 rounded h-32 resize-none"
            />
            <button type="submit" className="bg-green-300 px-3 py-1 rounded">작성</button>
          </form>
        </div>
      )}
    </div>
  );

};

export default Post;
