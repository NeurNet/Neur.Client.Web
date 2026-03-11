import { Link, useParams } from 'react-router';
import { fetchUserById } from '@/api/user';
import { ErrorMessage } from '@/components/error-message';
import { Loader } from '@/components/loader';
import { useQuery } from '@tanstack/react-query';
import { TransferTokenForm } from './TransferTokenForm';
import { RoleForm } from './RoleForm';

export function UserControl() {
  const { userId } = useParams();

  const {
    data: user,
    error,
    isPending,
  } = useQuery({
    queryKey: ['users', userId],
    queryFn: () => fetchUserById(userId || ''),
  });

  if (isPending) return <Loader />;
  if (error) return <ErrorMessage message={error.message} />;

  return (
    <>
      <h1>
        <Link to="/panel">Панель управления</Link> &gt; {user.user_name}
      </h1>

      <p>
        Имя: {user.name} {user.surname}
      </p>
      <p>Роль: {user.role}</p>
      <p>Кол-во токенов: {user.tokens}</p>

      <section>
        <h2>Изменение роли</h2>
        <p>
          Выберите новую роль для пользователя <b>{user.user_name}</b>:
        </p>
        <RoleForm user={user} />
      </section>

      <section>
        <h2>Передача токенов</h2>
        <p>Вы можете передать свои токены выбранному пользователю.</p>
        <TransferTokenForm userId={user.user_id} />
      </section>
    </>
  );
}
