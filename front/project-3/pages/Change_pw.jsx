import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../src/AuthContexts';
const apiUrl = import.meta.env.VITE_API_URL;


const ChangePassword = () => {
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
        <div>
            <h1>BORLD</h1>
            <p>Welcome, {user.username}</p>

            <div>
                <button onClick={() => navigate('/account')}>My</button>
                <button onClick={handleSignOut}>Sign Out</button>
            </div>

            <div>
                <div>
                    <label>your password : </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div>
                    <label>New password : </label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
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
    );
};

export default ChangePassword;
