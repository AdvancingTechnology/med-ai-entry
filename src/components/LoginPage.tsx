
import React, { useState } from "react";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Just demo handlers, no authentication logic yet
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Show a toast, alert, or handle login later
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-softblue">
      <div className="w-full max-w-md mx-auto p-8 rounded-2xl shadow-lg bg-white flex flex-col items-center animate-fade-in">
        {/* Logo placeholder */}
        <div className="mb-6 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-softblue-200 flex items-center justify-center shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" className="text-softblue-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="6" />
              <path d="M8 10h.01M16 10h.01M12 16c-3 0-4-2-4-2" />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-semibold text-softblue-800 mb-2 font-sans">
          Welcome back
        </h1>
        <p className="text-gray-500 font-sans mb-8 text-base">
          Sign in to your Healthcare AI Assistant
        </p>
        {/* Login Form */}
        <form className="w-full" onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-softblue-800 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="username"
              className="block w-full rounded-lg border border-softblue-200 bg-softblue-100 focus:ring-2 focus:ring-softblue-400 focus:border-softblue-400 transition outline-none px-4 py-3 text-base font-sans text-gray-700 placeholder-gray-400"
              placeholder="you@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              spellCheck={false}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="block text-sm font-medium text-softblue-800 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              className="block w-full rounded-lg border border-softblue-200 bg-softblue-100 focus:ring-2 focus:ring-softblue-400 focus:border-softblue-400 transition outline-none px-4 py-3 text-base font-sans text-gray-700 placeholder-gray-400"
              placeholder="Your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              spellCheck={false}
            />
          </div>
          <div className="flex items-center justify-between mb-8">
            <a
              href="#"
              className="text-sm text-softblue-600 hover:underline focus:underline transition font-medium"
            >
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-softblue-600 hover:bg-softblue-800 text-white font-semibold rounded-lg py-3 text-base shadow transition duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-softblue-400 font-sans"
          >
            Login
          </button>
        </form>
        <div className="mt-8 text-center w-full">
          <span className="text-gray-500 font-sans">Don&apos;t have an account? </span>
          <a
            href="#"
            className="text-softblue-600 hover:underline focus:underline transition font-medium"
          >
            Create account
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
