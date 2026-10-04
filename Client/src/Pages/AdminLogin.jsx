import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CircleAlert,
  Eye,
  EyeOff,
  LoaderCircle,
  Lock,
  LogIn,
  User,
} from "lucide-react";
import API from "../Services/api";
import { isLoggedIn, setToken } from "../Services/auth";
import logo from "../assets/amv-logo.png";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await API.post("/auth/login", form);
      setToken(data.token);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const fieldIcon =
    "pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-stone-400";

  return (
    <div className="relative flex min-h-[calc(100vh-4.5rem)] items-center justify-center overflow-hidden bg-gradient-to-br from-maroon-50 via-stone-50 to-gold-50 px-4 py-16">
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-maroon-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-gold-200/50 blur-3xl" />

      <div className="relative w-full max-w-md animate-fade-up rounded-3xl bg-white p-8 shadow-2xl ring-1 shadow-maroon-900/10 ring-stone-200/70 sm:p-10">
        <img
          src={logo}
          alt=""
          className="mx-auto h-20 w-20 rounded-full ring-4 ring-gold-200"
        />
        <h2 className="mt-5 text-center text-3xl font-bold text-maroon-900">
          Admin Login
        </h2>
        <p className="mt-2 text-center text-sm text-stone-500">
          Sign in to manage the school website.
        </p>

        {error && (
          <div
            role="alert"
            className="mt-6 flex animate-fade-up items-center gap-3 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200"
          >
            <CircleAlert className="h-5 w-5 shrink-0" aria-hidden="true" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-stone-700">
              Username
            </span>
            <span className="relative block">
              <User className={fieldIcon} aria-hidden="true" />
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                autoComplete="username"
                className="input pl-11"
              />
            </span>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold text-stone-700">
              Password
            </span>
            <span className="relative block">
              <Lock className={fieldIcon} aria-hidden="true" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
                className="input pr-12 pl-11"
              />
              <button
                type="button"
                onClick={() => setShowPassword((show) => !show)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute top-2 right-2 rounded-lg p-1.5 text-stone-400 transition hover:bg-stone-100 hover:text-maroon-700"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-maroon-800 py-3.5 font-semibold text-white shadow-lg shadow-maroon-900/20 transition hover:-translate-y-0.5 hover:bg-maroon-700 disabled:translate-y-0 disabled:opacity-70"
          >
            {loading ? (
              <LoaderCircle
                className="h-5 w-5 animate-spin"
                aria-hidden="true"
              />
            ) : (
              <LogIn className="h-5 w-5" aria-hidden="true" />
            )}
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
