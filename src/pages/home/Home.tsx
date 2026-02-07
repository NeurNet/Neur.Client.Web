import { Link } from 'react-router';
import { useCurrentUser } from '@/hooks/useCurrentUser';

export function Home() {
  const { currentUser, isLoading } = useCurrentUser();

  if (isLoading) return <span>Loading...</span>;

  return (
    <>
      <h1>Home page!</h1>
      {currentUser ? (
        <div>
          <p>Username: {currentUser.username}</p>
          <p>Role: {currentUser.role}</p>
          <p>Tokens: {currentUser.tokens}</p>
        </div>
      ) : (
        <span>
          Not authorized! <Link to="/login">Login</Link>
        </span>
      )}
    </>
  );
}
