import React, { useState } from 'react';
import { loginUser } from '../api'; // adjust path if needed

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const onChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    setLoading(true);

    try {
      const data = await loginUser({
        email: form.email,
        password: form.password,
      });

      // ✅ store token + user
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // ✅ optional redirect
      window.location.href = '/'; // or "/dashboard"
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-900">
          Welcome back
        </h2>

        {err && (
          <p className="mb-3 rounded-lg bg-red-50 p-2 text-sm text-red-700">
            ❌ {err}
          </p>
        )}

        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={onChange}
              placeholder="you@example.com"
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={onChange}
              placeholder="••••••••"
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-lg bg-gray-900 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-60"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{' '}
          <a
            href="/register"
            className="font-medium text-gray-900 hover:underline"
          >
            Register
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
