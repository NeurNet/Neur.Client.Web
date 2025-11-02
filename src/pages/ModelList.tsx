import { Link } from 'react-router-dom';

function ModelList() {
  return (
    <div>
      You&apos;re not logged in. <Link to="/login">Log in</Link>
    </div>
  );
}

export default ModelList;
