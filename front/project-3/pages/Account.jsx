import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../src/AuthContexts';
const apiUrl = import.meta.env.VITE_API_URL;


const Account = () => {
  const { user } = useAuth();
  const { signIn } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user.username);
  const [editedEmail, setEditedEmail] = useState(user.email);

  const navigate = useNavigate();

  const handleCancel = () => {
    setIsEditing(false);
    setEditedName(user.username);
    setEditedEmail(user.email);
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate('/');
  };

  const handleSave = async () => {
    if(!editedName || !editedEmail) return alert('정보를 모두 입력해주세요');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // 이메일 형식 확인
  if (!emailRegex.test(editedEmail)) {
    alert("이메일 형식이 올바르지 않습니다. 다시 입력해주세요.");
    return;
  }
    try {
        const response = await fetch(`${apiUrl}/account/edit`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: user.id,
            username: editedName,
            email: editedEmail,
          }),
        });
        const data = await response.json();
        if (response.ok) {
          signIn(user.id, data.username, data.email);
          setIsEditing(false);
          navigate('/account'); // 수정된 정보로 돌아감
        } else {
          alert('수정에 실패했습니다. 다시 시도해 주세요.');
        }
      } catch (error) {
        console.error('에러 발생:', error);
        alert('서버와의 연결에 문제가 생겼습니다.'); 
      }
  }

  return (
    <div>
      {!isEditing ? (
        <div>
          <h1>BORLD</h1>
          <p>Welcome, {user.username}</p>

          <div>
            <button disabled>My</button>
            <button onClick={handleSignOut}>Sign Out</button>
          </div>

          <div>
            <button onClick={() => navigate('/post')}>Back</button>
            <button onClick={() => navigate('/account/pw')}>Change Password</button>

            <div>
              <p>Name : {user.username}</p>
              <p>Email : {user.email}</p>
            </div>

            <button onClick={() => setIsEditing(true)}>Edit</button>
          </div>
        </div>
      ) : (
        <div>
          <h1>BORLD</h1>
          <p>Welcome, {user.username}</p>

          <div>
            <button disabled>My</button>
            <button onClick={handleSignOut}>Sign Out</button>
          </div>

          <div>
            <button onClick={() => navigate('/post')}>Back</button>
            <button onClick={() => navigate('/account/pw')}>Change Password</button>

            <div>
              <label>Name : </label>
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
            </div>

            <div>
              <label>Email : </label>
              <input
                type="email"
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
              />
            </div>

            <div>
              <button onClick={handleCancel}>Cancel</button>
              <button
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
