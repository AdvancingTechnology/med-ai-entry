
import React, { useState } from "react";
import { Stethoscope } from "lucide-react";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Show a toast, alert, or handle login later
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-softblue font-sans">
      <div className="w-full max-w-md mx-auto p-8 rounded-2xl shadow-lg bg-white flex flex-col items-center animate-fade-in">
        {/* Logo area with stethoscope icon for healthcare theme */}
        <div className="mb-6 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-softblue-200 flex items-center justify-center shadow-md">
            <Stethoscope size={44} strokeWidth={2.2} className="text-softblue-800" aria-label="Healthcare logo" />
          </div>
        </div>
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold text-softblue-800 mb-2 font-sans" style={{ letterSpacing: "-0.5px" }}>
          Welcome back
        </h1>
        <p
          className="text-lg sm:text-xl text-softblue-800 font-semibold mb-8 text-center leading-7"
          style={{ maxWidth: 380 }}
        >
          Sign in to your Virtual Doctor&apos;s Office
        </p>
        {/* Login Form */}
        <form className="w-full" onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-base sm:text-lg font-semibold text-softblue-800 mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="username"
              className="block w-full rounded-xl border border-softblue-200 bg-softblue-100 focus:ring-2 focus:ring-softblue-400 focus:border-softblue-400 transition outline-none px-4 py-3 text-lg sm:text-xl font-sans text-gray-700 placeholder-gray-400"
              placeholder="you@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              spellCheck={false}
              aria-label="Email Address"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="password"
              className="block text-base sm:text-lg font-semibold text-softblue-800 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              className="block w-full rounded-xl border border-softblue-200 bg-softblue-100 focus:ring-2 focus:ring-softblue-400 focus:border-softblue-400 transition outline-none px-4 py-3 text-lg sm:text-xl font-sans text-gray-700 placeholder-gray-400"
              placeholder="Your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              spellCheck={false}
              aria-label="Password"
            />
          </div>
          <div className="flex items-center justify-between mb-8">
            <a
              href="#"
              className="text-base text-softblue-600 hover:underline focus:underline transition font-semibold"
            >
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-softblue-600 hover:bg-softblue-800 text-white font-bold rounded-xl py-3 text-lg sm:text-xl shadow transition duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-softblue-400 font-sans"
          >
            Login
          </button>
        </form>
        <div className="mt-8 text-center w-full">
          <span className="text-gray-500 font-sans text-base sm:text-lg">Don&apos;t have an account? </span>
          <a
            href="#"
            className="text-softblue-600 hover:underline focus:underline transition font-semibold text-base sm:text-lg"
          >
            Create account
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
