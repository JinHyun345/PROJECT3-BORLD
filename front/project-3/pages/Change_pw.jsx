import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../src/AuthContexts';
import { useTheme } from "../src/ThemeContexts";

const apiUrl = import.meta.env.VITE_API_URL;


const ChangePassword = () => {
    const { darkMode, setDarkMode } = useTheme();

    const { user } = useAuth();
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const navigate = useNavigate();

    const handleCancel = () => {
        setPassword("");
        setNewPassword("");
        navigate('/account');
    };
    const handleSignOut = () => {
        localStorage.removeItem("token");
        navigate('/');
    };
    const handleSave = async () => {
        if (!password || !newPassword) {
            return alert("모든 정보를 입력해주세요.");
        }
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${apiUrl}/account/changepw`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    password: password,
                    newPassword: newPassword,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                setPassword("");
                setNewPassword("");
                alert(data.message);
                localStorage.removeItem("token");
                navigate('/');
            } else {
                alert(data.error || data.message || '변경에 실패했습니다. 다시 시도해 주세요.');
            }
        } catch (error) {
            alert('서버와의 연결에 문제가 생겼습니다.');
        }
    }
    return (
        <div className="min-h-screen bg-white dark:bg-black flex flex-col items-center justify-center text-black dark:text-white transition-colors duration-500">
            <div className="w-full max-w-lg p-8 bg-white dark:bg-black rounded-lg shadow-lg space-y-6 text-center">
                <h1 className="text-4xl font-bold tracking-wide font-inter mb-6">BORLD</h1>
                <p className="text-xl mb-4">Welcome, <span className="font-semibold">{user.username}</span></p>

                <div className="space-y-4">
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

                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <label className="text-lg">Your password:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 border border-black dark:border-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
                            />
                        </div>

                        <div className="flex justify-between items-center">
                            <label className="text-lg">New password:</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full p-3 border border-black dark:border-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
                            />
                        </div>

                        <div className="flex justify-center space-x-6 mt-6">
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
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="mt-6 px-4 py-2 text-sm border border-gray-400 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition"
                    >
                        {darkMode ? "🌞" : "🌙"}
                    </button>
                </div>
            </div>
        </div>

    );
};

export default ChangePassword;
