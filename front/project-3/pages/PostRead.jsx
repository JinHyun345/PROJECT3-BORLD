import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
const apiUrl = import.meta.env.VITE_API_URL;


function PostRead() {
  const { uuid } = useParams(); // URL에서 uuid 추출
  const navigate = useNavigate(); // 뒤로가기 버튼을 위한 navigate 함수
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const currentUser = "current_user_id"; // 현재 로그인된 사용자 ID (이건 실제 로그인 상태에 따라 동적으로 변경됨)

  useEffect(() => {
    // 해당 uuid에 맞는 게시물을 가져오는 API 호출 (예시)
    const fetchPost = async () => {
      try {
        const response = await fetch(`${apiUrl}/posts/${uuid}`);
        const data = await response.json();
        console.log(data);
        setPost(data);
      } catch (error) {
        console.error('게시물 가져오기 실패:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [uuid]);

  const handleDelete = async () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      try {
        await fetch(`/api/posts/${uuid}`, {
          method: 'DELETE',
        });
        navigate('/posts'); // 삭제 후 목록 페이지로 이동
      } catch (error) {
        console.error('삭제 실패:', error);
      }
    }
  };

  if (isLoading) {
    return <p>로딩 중...</p>;
  }

  if (!post) {
    return <p>게시물을 찾을 수 없습니다.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* 뒤로가기 버튼 */}
      <button 
        onClick={() => navigate(-1)} 
        className="text-blue-500 hover:text-blue-700 mb-4"
      >
        뒤로가기
      </button>

      {/* 게시물 제목 */}
      <h1 className="text-3xl font-bold">{post.title}</h1>

      {/* 게시물 내용 */}
      <div className="mt-4 text-lg">{post.content}</div>

      {/* 해시태그 */}
      {/* {post.hashtags && post.hashtags.length > 0 && (
        <div className="mt-4">
          <span className="font-semibold">Hashtags: </span>
          {post.hashtags.map((hashtag, index) => (
            <span key={index} className="text-blue-500">
              #{hashtag}{" "}
            </span>
          ))}
        </div>
      )} */}

      {/* 작성자 정보 */}
      <div className="mt-4 text-gray-600">
        <span className="font-semibold">작성자:</span> {post.username}
      </div>

      {/* 수정 버튼 (작성자가 현재 로그인한 사용자일 경우) */}
      {post.userId === currentUser && (
        <div className="mt-4">
          <button 
            onClick={() => navigate(`/post/edit/${uuid}`)} 
            className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
          >
            수정
          </button>
        </div>
      )}

      {/* 삭제 버튼 (작성자가 현재 로그인한 사용자일 경우) */}
      {post.userId === currentUser && (
        <div className="mt-2">
          <button 
            onClick={handleDelete} 
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
}

export default PostRead;
