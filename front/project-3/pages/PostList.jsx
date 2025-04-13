import { useEffect, useState } from 'react';
const apiUrl = import.meta.env.VITE_API_URL;

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}//post`, {
      credentials: 'include', // 세션 정보 포함해서 보내기!
    })
      .then(res => {
        if (!res.ok) throw new Error('인증 필요!');
        return res.json();
      })
      .then(data => setPosts(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">게시글 목록</h2>
      <ul className="space-y-2">
        {posts.map(post => (
          <li key={post.id} className="p-4 rounded shadow bg-white">
            <h3 className="text-lg font-semibold">{post.title}</h3>
            <p className="text-sm text-gray-500">{post.created_at}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
