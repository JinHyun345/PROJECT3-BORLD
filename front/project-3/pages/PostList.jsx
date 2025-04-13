import { useEffect, useState } from 'react';
const apiUrl = import.meta.env.VITE_API_URL;

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const navigate = useNavigate();

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

  
  useEffect(() => {
    fetch(`${apiUrl}//posts`, {
      credentials: 'include', // 세션 정보 포함해서 보내기!
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
      const res = await fetch(`${apiUrl}/posts`);
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("글 불러오기 에러", err);
    }
  };
    // 글 작성
    const handleCreate = async (e) => {
      e.preventDefault();
      try {
        const res = await fetch(`${apiUrl}/posts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({ title, body }),
        });
        if (res.ok) {
          setTitle('');
          setBody('');
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
        await fetch(`${apiUrl}/posts/${id}`, {
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
  return (
    <div className="post-list">
      <button onClick={handleSignOut} className="mr-2">sign out</button>
      <button onClick={handleDeleteAccount}>Delete Account</button>
      <h2>게시글 목록</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
            <button onClick={() => handleDelete(post.id)}>삭제</button>
          </li>
        ))}
      </ul>

      <h3>새 게시글 작성</h3>
      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="내용"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button type="submit">작성</button>
      </form>
    </div>
  );
};

export default PostList;
