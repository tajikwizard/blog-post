import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo / Title */}
        <Link to="/">
          <h2 className="text-lg font-bold tracking-tight text-gray-900">
            BlogPost
          </h2>
        </Link>

        {/* Navigation */}
        <ul className="flex items-center gap-4">
          {user ? (
            <>
              <li>
                <Link
                  to="/"
                  className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
                >
                  All Posts
                </Link>
              </li>
              <li>
                <Link
                  to="/my-posts"
                  className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
                >
                  My Posts
                </Link>
              </li>
              <li>
                <Link
                  to="/create-post"
                  className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
                >
                  Create Post
                </Link>
              </li>
              <li className="text-sm font-medium text-gray-700">
                Welcome, <span className="font-semibold text-gray-900">{user.name}</span>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="
                    rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white
                    transition hover:bg-gray-800
                  "
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-600 transition hover:text-gray-900"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="
                    rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white
                    transition hover:bg-gray-800
                  "
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}
