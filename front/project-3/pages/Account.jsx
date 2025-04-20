import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../src/AuthContexts';
import { useTheme } from "../src/ThemeContexts";

const apiUrl = import.meta.env.VITE_API_URL;


const Account = () => {
  const { darkMode, setDarkMode } = useTheme();

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
    if (!editedName || !editedEmail) return alert('정보를 모두 입력해주세요');
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
        alert('변경되었습니다.');
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
    <div className="min-h-screen bg-white dark:bg-black flex flex-col items-center justify-center text-black dark:text-white transition-colors duration-500">
      <div className="w-full max-w-lg p-8 bg-white dark:bg-black rounded-lg shadow-lg space-y-6 text-center">
        <h1 className="text-4xl font-bold tracking-wide font-inter mb-6">BORLD</h1>
        <p className="text-xl mb-4">Welcome, <span className="font-semibold">{user.username}</span></p>

        <div className="space-y-4">
          {/* My & Sign Out Buttons */}
          <div className="flex justify-center space-x-6">
            <button
              onClick={() => navigate('/post')}
              className="px-8 py-3 border border-gray-400 text-gray-600 dark:border-gray-400 dark:text-gray-200 font-medium rounded-md shadow-xl hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-300"
            >
              Back
            </button>
            <button
              onClick={handleSignOut}
              className="px-8 py-3 border border-black dark:border-white text-black dark:text-white font-medium rounded-md shadow-xl hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
            >
              Sign Out
            </button>
          </div>

          {/* Edit/Save Section */}
          {!isEditing ? (
            <div className="space-y-6">
              <div className="flex flex-col items-center space-y-4">

                <button
                  onClick={() => navigate('/account/pw')}
                  className="px-8 py-3 border border-gray-400 text-gray-600 dark:border-gray-400 dark:text-gray-200 font-medium rounded-md shadow-xl hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-300"
                >
                  Change Password
                </button>
              </div>

              <div className="space-y-4">
                <p className="text-lg">Name : {user.username}</p>
                <p className="text-lg">Email : {user.email}</p>
              </div>

              <button
                onClick={() => setIsEditing(true)}
                className="px-8 py-3 border border-black dark:border-white text-black dark:text-white font-medium rounded-md shadow-xl hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
              >
                Edit
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-lg">Name</label>
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="w-full p-3 border border-black dark:border-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
                  />
                </div>

                <div className="flex justify-between items-center">
                  <label className="text-lg">Email</label>
                  <input
                    type="email"
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                    className="w-full p-3 border border-black dark:border-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex justify-center space-x-6">
                <button
                  onClick={handleCancel}
                  className="px-8 py-3 border border-gray-400 text-gray-600 dark:border-gray-400 dark:text-gray-200 font-medium rounded-md shadow-xl hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-300"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSave}
                  className="px-8 py-3 border border-black dark:border-white text-black dark:text-white font-medium rounded-md shadow-xl hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="mt-6 px-4 py-2 text-sm border border-gray-400 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition"
      >
        {darkMode ? "🌞" : "🌙"}
      </button>
    </div>

  );
};

export default Account;
