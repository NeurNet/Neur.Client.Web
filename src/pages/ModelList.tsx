import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

function ModelList() {
  const navigate = useNavigate();
  const { auth, isLoading, logout } = useAuth();

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
      {auth ? (
        <p>
          Привет, {auth.id}! <button onClick={logoutHandler}>Выйти</button>
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
