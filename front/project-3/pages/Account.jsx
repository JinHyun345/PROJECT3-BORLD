import { useNavigate } from 'react-router-dom';
import { useAuth } from '../src/AuthContexts';


const Account = () => {
  const navigate = useNavigate();
    const { user } = useAuth();
  

  const handleSignOut = () => {
    localStorage.removeItem("token"); 
    navigate('/');
  };

  return (
    <div>
      <h1>BORLD</h1>
      <p>Welcome, {user.username}</p>

      <div>
        <button disabled>My</button>
        <button onClick={handleSignOut}>
          Sign Out
        </button>
      </div>

      <div>
        <button onClick={() => navigate('/post')}>Back</button>
        <button onClick={() => navigate('/account/pw')}>Change Password</button>

        <div>
          <p>Name : {user.username}</p>
          <p>Email : {user.email}</p>
        </div>

        <button onClick={() => navigate('/account/edit')}>Edit</button>
      </div>
    </div>
  );
}

export default Account;
