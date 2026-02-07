import { useAuth } from '@/providers/auth';
import { Link } from 'react-router';

export function Home() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <span>Loading...</span>;

  return (
    <>
      <h1>Home page!</h1>
      {user ? (
        <div>
          <p>Username: {user.username}</p>
          <p>Role: {user.role}</p>
          <p>Tokens: {user.tokens}</p>
        </div>
      ) : (
        <span>
          Not authorized! <Link to="/login">Login</Link>
        </span>
      )}
    </>
  );
}
