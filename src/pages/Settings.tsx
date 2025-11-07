import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

function Settings() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout()
      .then(() => navigate('/login'))
      .catch(console.error);
  };

  if (!user) {
    return null;
  }

  return (
    <div>
      <p>Выполнен вход как {user.id}</p>
      <button className="button" onClick={logoutHandler}>
        Выйти
      </button>
      <p>
        <Link to="/" className="link">
          Назад
        </Link>
      </p>
    </div>
  );
}

export default Settings;
