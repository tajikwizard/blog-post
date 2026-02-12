import { Link } from 'react-router-dom';
export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo / Title */}
        <h2 className="text-lg font-bold tracking-tight text-gray-900">
          BlogPost
        </h2>

        {/* Navigation */}
        <ul className="flex items-center gap-4">
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
        </ul>
      </div>
    </header>
  );
}
