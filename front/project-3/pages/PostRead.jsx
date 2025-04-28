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
    <div className="min-h-screen bg-white dark:bg-black flex flex-col items-center justify-start text-black dark:text-white transition-colors duration-500">
  <div className="w-full max-w-4xl p-8 bg-white dark:bg-black rounded-lg shadow-xl space-y-8">
    {/* 뒤로가기 버튼 */}
    <button 
      onClick={() => navigate(-1)} 
      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-6 text-lg font-semibold"
    >
      뒤로가기
    </button>

    {/* 게시물 제목 */}
    <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-200 mb-4">{post.title}</h1>

    {/* 게시물 내용 */}
    <div className="mt-6 text-lg text-gray-700 dark:text-gray-300">{post.content}</div>

    {/* 해시태그 */}
    {/* {post.hashtags && post.hashtags.length > 0 && (
      <div className="mt-4 text-gray-600 dark:text-gray-400">
        <span className="font-semibold">Hashtags: </span>
        {post.hashtags.map((hashtag, index) => (
          <span key={index} className="text-blue-500 dark:text-blue-400">
            #{hashtag}{" "}
          </span>
        ))}
      </div>




      
    )} */}

    {/* 작성자 정보 */}
    <div className="mt-6 text-gray-600 dark:text-gray-400">
      <span className="font-semibold">작성자:</span> {post.username}
    </div>

    {/* 수정 버튼 (작성자가 현재 로그인한 사용자일 경우) */}
    {post.userId === currentUser && (
      <div className="mt-6">
        <button 
          onClick={() => navigate(`/post/edit/${uuid}`)} 
          className="w-full px-6 py-3 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600 transition duration-300"
        >
          수정
        </button>
      </div>
    )}

    {/* 삭제 버튼 (작성자가 현재 로그인한 사용자일 경우) */}
    {post.userId === currentUser && (
      <div className="mt-4">
        <button 
          onClick={handleDelete} 
          className="w-full px-6 py-3 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-300"
        >
          삭제
        </button>
      </div>
    )}
  </div>
</div>

  );
}

export default PostRead;
