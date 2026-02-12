import React from 'react';

function Register() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-semibold text-gray-900">
          Create an account
        </h2>

        <form className="flex flex-col gap-4">
          {/* Name */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              placeholder="Your name"
              className="
                rounded-lg border border-gray-300 px-3 py-2 text-sm
                focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900
              "
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="
                rounded-lg border border-gray-300 px-3 py-2 text-sm
                focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900
              "
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="
                rounded-lg border border-gray-300 px-3 py-2 text-sm
                focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900
              "
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="
              mt-2 rounded-lg bg-gray-900 py-2 text-sm font-medium text-white
              transition hover:bg-gray-800
            "
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <a
            href="/login"
            className="font-medium text-gray-900 hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
