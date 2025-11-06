import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

function ModelList() {
  const { auth, isLoading } = useAuth();

  if (isLoading) {
    return <p>Загрузка...</p>;
  }

  return (
    <div>
      {auth ? (
        <p>Привет, {auth.id}!</p>
      ) : (
        <p>
          Вы не вошли в аккаунт! <Link to="/login">Войти</Link>
        </p>
      )}
    </div>
  );
}

export default ModelList;
