import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../src/AuthContexts';
const apiUrl = import.meta.env.VITE_API_URL;


const Account = () => {
  const { user } = useAuth();

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
    try {
        const response = await fetch(`${apiUrl}/account/edit`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            email: email,
          }),
        });
  
        if (response.ok) {
          navigate('/account'); // 수정된 정보로 돌아감
          setIsEditing(false);

        } else {
          alert('수정에 실패했습니다. 다시 시도해 주세요.');
        }
      } catch (error) {
        console.error('에러 발생:', error);
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
