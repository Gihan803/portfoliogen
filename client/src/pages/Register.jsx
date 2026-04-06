import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Register() {
  const { register, error, clearError } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const [localError, setLocalError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    clearError();
    setLocalError('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    // Client-side validations
    if (formData.password.length < 6) {
      setLocalError('Password must be at least 6 characters');
      return;
    }

    if (formData.password !== formData.passwordConfirm) {
      setLocalError('Passwords do not match');
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(formData.username)) {
      setLocalError('Username can only contain letters, numbers, and underscores');
      return;
    }

    setSubmitting(true);
    const result = await register(formData);

    if (result.success) {
      navigate('/create', { replace: true });
    }

    setSubmitting(false);
  };

  const displayError = localError || error;

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-10">
      {/* Background Glow */}
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-600/15 blur-[150px] rounded-full -z-10" />

      <div className="w-full max-w-md animate-fade-in-up">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3">
            Create Your <span className="gradient-text">Account</span>
          </h1>
          <p className="text-surface-200">Start building your professional portfolio today</p>
        </div>

        {/* Form Card */}
        <div className="glass-card p-8">
          {/* Error Alert */}
          {displayError && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {displayError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label htmlFor="reg-fullName" className="block text-sm font-medium text-surface-200 mb-2">
                Full Name
              </label>
              <input
                id="reg-fullName"
                name="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="John Doe"
                className="input-field"
                autoComplete="name"
              />
            </div>

            {/* Username */}
            <div>
              <label htmlFor="reg-username" className="block text-sm font-medium text-surface-200 mb-2">
                Username
              </label>
              <input
                id="reg-username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                placeholder="johndoe"
                className="input-field"
                autoComplete="username"
              />
              <p className="text-xs text-surface-700 mt-1.5">
                Your portfolio will be at <span className="text-primary-400">/portfolio/{formData.username || '...'}</span>
              </p>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="reg-email" className="block text-sm font-medium text-surface-200 mb-2">
                Email Address
              </label>
              <input
                id="reg-email"
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
              <label htmlFor="reg-password" className="block text-sm font-medium text-surface-200 mb-2">
                Password
              </label>
              <input
                id="reg-password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Min. 6 characters"
                className="input-field"
                autoComplete="new-password"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="reg-passwordConfirm" className="block text-sm font-medium text-surface-200 mb-2">
                Confirm Password
              </label>
              <input
                id="reg-passwordConfirm"
                name="passwordConfirm"
                type="password"
                required
                value={formData.passwordConfirm}
                onChange={handleChange}
                placeholder="Repeat your password"
                className="input-field"
                autoComplete="new-password"
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
                  Creating account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Footer Link */}
          <p className="text-center text-sm text-surface-200 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-primary-400 hover:text-primary-300 font-medium no-underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
