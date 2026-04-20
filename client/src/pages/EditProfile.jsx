import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-hot-toast';

function EditProfile() {
  const { user, updateProfile, error, clearError } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: user?.fullName || '',
    username: user?.username || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [localError, setLocalError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    clearError();
    setLocalError('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');

    if (!formData.currentPassword) {
      setLocalError('Current password is required to save changes');
      return;
    }

    if (formData.newPassword && formData.newPassword.length < 6) {
      setLocalError('New password must be at least 6 characters');
      return;
    }

    if (formData.newPassword !== formData.confirmNewPassword) {
      setLocalError('New passwords do not match');
      return;
    }

    setSubmitting(true);
    const updateData = {
      fullName: formData.fullName,
      username: formData.username,
      email: formData.email,
      currentPassword: formData.currentPassword,
    };

    if (formData.newPassword) {
      updateData.newPassword = formData.newPassword;
    }

    const result = await updateProfile(updateData);

    if (result.success) {
      toast.success('Profile updated successfully!');
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: '',
      }));
    } else {
      toast.error(result.error || 'Failed to update profile');
    }

    setSubmitting(false);
  };

  const displayError = localError || error;

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12">
      {/* Background Glow */}
      <div className="fixed top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-600/15 blur-[150px] rounded-full -z-10" />

      <div className="w-full max-w-xl animate-fade-in-up">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3">
            Edit <span className="gradient-text">Profile</span>
          </h1>
          <p className="text-surface-200">Keep your account details up to date</p>
        </div>

        {/* Form Card */}
        <div className="glass-card p-8">
          {displayError && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {displayError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-surface-200 mb-2">
                  Full Name
                </label>
                <input
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="input-field"
                />
              </div>

              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-surface-200 mb-2">
                  Username
                </label>
                <input
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="johndoe"
                  className="input-field"
                />
                <p className="text-xs text-surface-700 mt-1.5">
                  Portfolio: <span className="text-primary-400">/portfolio/{formData.username}</span>
                </p>
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-surface-200 mb-2">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="input-field"
              />
            </div>

            <div className="pt-4 border-t border-white/5">
              <h3 className="text-lg font-semibold mb-4 text-white">Change Password</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-surface-200 mb-2">
                    New Password (Optional)
                  </label>
                  <input
                    name="newPassword"
                    type="password"
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="Min. 6 characters"
                    className="input-field"
                    autoComplete="new-password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-surface-200 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    name="confirmNewPassword"
                    type="password"
                    value={formData.confirmNewPassword}
                    onChange={handleChange}
                    placeholder="Repeat new password"
                    className="input-field"
                    autoComplete="new-password"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 bg-primary-500/5 -mx-8 px-8 py-6">
              <label className="block text-sm font-bold text-primary-400 mb-2">
                Confirm Current Password
              </label>
              <p className="text-xs text-surface-400 mb-3">
                Required to save any changes to your profile.
              </p>
              <input
                name="currentPassword"
                type="password"
                required
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="Enter current password"
                className="input-field border-primary-500/30 focus:border-primary-500"
                autoComplete="current-password"
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary flex-1 py-3 text-base disabled:opacity-50"
              >
                {submitting ? 'Saving Changes...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-3 rounded-xl border border-white/10 text-surface-200 hover:text-white hover:bg-white/5 transition-all outline-none"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
