import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navigation() {
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setMobileOpen(false);
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  // Check if we are on a portfolio page AND the current user is NOT the owner
  const isPortfolioPage = location.pathname.startsWith('/portfolio/');
  const usernameFromUrl = isPortfolioPage ? location.pathname.split('/')[2] : null;
  const isOwner = user?.username === usernameFromUrl;

  if (isPortfolioPage && !isOwner) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 no-underline">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="text-xl font-bold gradient-text hidden sm:block">PortfolioGen</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm font-medium no-underline transition-colors duration-200 ${isActive('/') ? 'text-primary-400' : 'text-surface-200 hover:text-white'
                }`}
            >
              Home
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  to="/create"
                  className={`text-sm font-medium no-underline transition-colors duration-200 ${isActive('/create') ? 'text-primary-400' : 'text-surface-200 hover:text-white'
                    }`}
                >
                  Create Portfolio
                </Link>
                <Link
                  to={`/portfolio/${user?.username}`}
                  className={`text-sm font-medium no-underline transition-colors duration-200 ${location.pathname.startsWith('/portfolio/') ? 'text-primary-400' : 'text-surface-200 hover:text-white'
                    }`}
                >
                  My Portfolio
                </Link>

                {/* User Menu */}
                <div className="flex items-center gap-3 ml-4 pl-4 border-l border-white/10">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-400 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      {user?.fullName?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <span className="text-sm text-surface-200">{user?.fullName}</span>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-surface-700 hover:text-red-400 transition-colors duration-200 cursor-pointer bg-transparent border-none font-medium"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-sm font-medium no-underline px-4 py-1.5 rounded-full border border-primary-500/40 text-primary-400 hover:bg-primary-500/15 hover:border-primary-500/60 hover:text-primary-300 transition-all duration-200"
                >
                  Login
                </Link>
                <Link to="/register" className="btn-primary text-sm no-underline py-2 px-4">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden bg-transparent border-none cursor-pointer p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5">
              <span className={`block w-6 h-0.5 bg-surface-200 transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-6 h-0.5 bg-surface-200 transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-0.5 bg-surface-200 transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 absolute top-14 left-0 right-0 bg-surface-950 border-b border-white/10 shadow-2xl ${mobileOpen ? 'max-h-[calc(100vh-3.5rem)] opacity-100 overflow-y-auto' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 py-4 flex flex-col gap-2">
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className={`block text-base font-medium no-underline py-2 ${isActive('/') ? 'text-primary-400' : 'text-surface-200 hover:text-white'}`}
          >
            Home
          </Link>

          {isLoggedIn ? (
            <>
              <Link
                to="/create"
                onClick={() => setMobileOpen(false)}
                className={`block text-base font-medium no-underline py-2 ${isActive('/create') ? 'text-primary-400' : 'text-surface-200 hover:text-white'}`}
              >
                Create Portfolio
              </Link>
              <Link
                to={`/portfolio/${user?.username}`}
                onClick={() => setMobileOpen(false)}
                className={`block text-base font-medium no-underline py-2 ${location.pathname.startsWith('/portfolio/') ? 'text-primary-400' : 'text-surface-200 hover:text-white'}`}
              >
                My Portfolio
              </Link>
              <div className="pt-3 border-t border-white/10 mt-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-400 flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {user?.fullName?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white m-0">{user?.fullName}</p>
                    <p className="text-xs text-surface-400 m-0">@{user?.username}</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:text-white hover:bg-red-500/15 border border-transparent hover:border-red-500/20 bg-transparent cursor-pointer transition-all duration-200"
                >
                  <span className="text-base leading-none">⏻</span>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-3 pt-1">
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className={`block text-base font-medium no-underline py-2 px-4 text-center rounded-lg border border-white/20 transition-colors ${isActive('/login') ? 'text-primary-400 border-primary-500/50' : 'text-surface-200 hover:text-white hover:bg-white/5'}`}
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileOpen(false)}
                className="btn-primary text-base no-underline block w-full py-2 px-4 text-center"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
