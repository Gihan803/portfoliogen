import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const { login, error, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);

  // Redirect destination after login (if user was bounced from a protected route)
  const from = location.state?.from?.pathname || '/create';

  const handleChange = (e) => {
    clearError();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const result = await login(formData);

    if (result.success) {
      navigate(from, { replace: true });
    }

    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-10">
      {/* Background Glow */}
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-600/15 blur-[150px] rounded-full -z-10" />

      <div className="w-full max-w-md animate-fade-in-up">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3">Welcome Back</h1>
          <p className="text-surface-200">Sign in to manage your portfolio</p>
        </div>

        {/* Form Card */}
        <div className="glass-card p-8">
          {/* Error Alert */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-surface-200 mb-2">
                Email Address
              </label>
              <input
                id="login-email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="input-field"
                autoComplete="email"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="login-password" className="block text-sm font-medium text-surface-200 mb-2">
                Password
              </label>
              <input
                id="login-password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="input-field"
                autoComplete="current-password"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full py-3.5 text-base disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Footer Link */}
          <p className="text-center text-sm text-surface-200 mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-primary-400 hover:text-primary-300 font-medium no-underline">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
