import { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { FaRegEye, FaSearch } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa6";
import { Link } from "react-router-dom";
import main_img from "../../images/cartify_login_img.png";

const Auth_Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passSee, setPassSee] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const validateEmail = (value: string) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);

  const validatePassword = (value: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(value);

  const showEmailError = emailTouched && !validateEmail(email);
  const showPasswordError = passwordTouched && !validatePassword(password);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEmailTouched(true);
    setPasswordTouched(true);

    if (!validateEmail(email) || !validatePassword(password)) {
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      console.log({ email, rememberMe });
      setSubmitting(false);
    }, 800);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0">
        <div className="absolute right-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-teal-500/20 blur-[120px]" />
        <div className="absolute left-[-10%] bottom-[-10%] h-[420px] w-[420px] rounded-full bg-indigo-500/20 blur-[140px]" />
      </div>

      <div className="relative flex min-h-screen flex-col items-center gap-16 px-4 py-10 lg:flex-row lg:items-stretch lg:gap-0 lg:px-10">
        <aside className="hidden flex-1 flex-col justify-between rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur md:flex">
          <div>
            <Link to="/" className="flex items-center gap-3 text-white">
              <FiShoppingCart className="text-3xl" />
              <span className="text-xl font-semibold">Cartify</span>
            </Link>
            <h1 className="mt-12 text-4xl font-semibold leading-tight text-white">
              A calmer way to shop the products you love.
            </h1>
            <p className="mt-4 text-sm text-slate-200">
              Quick checkout, real-time order updates, and recommendations crafted for you.
            </p>
          </div>
          <div className="rounded-2xl bg-white/10 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-teal-200">Trending search</p>
            <div className="mt-2 flex items-center gap-3 text-white">
              <FaSearch className="text-sm" />
              <span className="text-sm">“Noise-cancelling headphones”</span>
            </div>
            <p className="mt-4 text-xs text-slate-200">+4,300 shoppers signed in today</p>
          </div>
        </aside>

        <main className="flex w-full max-w-lg flex-1 items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="w-full rounded-3xl border border-white/10 bg-white p-8 text-slate-900 shadow-2xl shadow-black/20"
          >
            <div className="mb-8 space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-teal-600">Welcome back</p>
              <h2 className="text-2xl font-semibold text-slate-900">Sign in to continue</h2>
              <p className="text-sm text-slate-500">Use your Cartify credentials or company SSO.</p>
            </div>

            <div className="space-y-6">
              <label className="space-y-2 text-sm text-slate-600">
                <span>Email address</span>
                <div
                  className={`input input-bordered flex items-center gap-3 rounded-2xl border ${
                    showEmailError ? "border-rose-400 bg-rose-50" : "border-slate-200 bg-slate-50"
                  }`}
                >
                  <input
                    type="email"
                    value={email}
                    aria-invalid={showEmailError}
                    aria-describedby="email-help"
                    onChange={(event) => setEmail(event.target.value)}
                    onBlur={() => setEmailTouched(true)}
                    placeholder="you@example.com"
                    className="w-full bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>
                {showEmailError ? (
                  <span id="email-help" className="text-xs text-rose-500">
                    Enter a valid email like name@company.com
                  </span>
                ) : (
                  <span id="email-help" className="text-xs text-slate-400">
                    We will never share your email with third parties.
                  </span>
                )}
              </label>

              <label className="space-y-2 text-sm text-slate-600">
                <span>Password</span>
                <div
                  className={`input input-bordered flex items-center gap-3 rounded-2xl border ${
                    showPasswordError ? "border-rose-400 bg-rose-50" : "border-slate-200 bg-slate-50"
                  }`}
                >
                  <input
                    type={passSee ? "text" : "password"}
                    value={password}
                    aria-invalid={showPasswordError}
                    aria-describedby="password-help"
                    onChange={(event) => setPassword(event.target.value)}
                    onBlur={() => setPasswordTouched(true)}
                    placeholder="••••••••"
                    className="w-full bg-transparent text-slate-900 outline-none placeholder:text-slate-400"
                  />
                  <button
                    type="button"
                    onClick={() => setPassSee((prev) => !prev)}
                    className="text-slate-500 transition hover:text-slate-900"
                    aria-label={passSee ? "Hide password" : "Show password"}
                  >
                    {passSee ? <FaRegEye /> : <FaRegEyeSlash />}
                  </button>
                </div>
                {showPasswordError ? (
                  <span id="password-help" className="text-xs text-rose-500">
                    Must be 8+ chars with upper, lower, number & symbol.
                  </span>
                ) : (
                  <span id="password-help" className="text-xs text-slate-400">
                    Pro tip: enable password manager for faster checkout.
                  </span>
                )}
              </label>

              <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                    className="checkbox checkbox-sm border-slate-300"
                  />
                  Remember me
                </label>
                <Link to="/auth/forgot_pass" className="text-teal-600 hover:text-teal-500">
                  Forgot password?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn btn-md mt-8 w-full rounded-2xl border-none bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-600 hover:to-cyan-600 disabled:opacity-70"
            >
              {submitting ? "Signing in…" : "Log in"}
            </button>

            <div className="mt-6 flex items-center gap-4 text-xs text-slate-400">
              <span className="h-px flex-1 bg-slate-200" />
              or continue with
              <span className="h-px flex-1 bg-slate-200" />
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <button type="button" className="rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 hover:border-teal-200">
                Google Workspace
              </button>
              <button type="button" className="rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 hover:border-teal-200">
                Microsoft SSO
              </button>
            </div>

            <p className="mt-8 text-center text-sm text-slate-500">
              Don&apos;t have an account?
              <Link to="/auth/signup" className="ml-2 font-semibold text-teal-600 hover:text-teal-500">
                Create one
              </Link>
            </p>
          </form>
        </main>
      </div>
    </div>
  );
};

export default Auth_Login;
