import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { login } from '@/utils/auth';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    login(username, password).then(console.log).catch(console.error);
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <input type="text" onChange={(e) => setUsername(e.target.value)} />
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
        <input type="submit" value="Log in" />
      </form>
      <Link to="/">Go back</Link>
    </div>
  );
}

export default Login;
