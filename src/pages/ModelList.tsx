import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

function ModelList() {
  const navigate = useNavigate();
  const { user, isLoading, logout } = useAuth();

  const logoutHandler = () => {
    logout()
      .then(() => navigate('/login'))
      .catch(console.error);
  };

  if (isLoading) {
    return <p>Загрузка...</p>;
  }

  return (
    <div>
      {user ? (
        <p>
          Привет, {user.id}! <button onClick={logoutHandler}>Выйти</button>
        </p>
      ) : (
        <p>
          Вы не вошли в аккаунт! <Link to="/login">Войти</Link>
        </p>
      )}
    </div>
  );
}

export default ModelList;
