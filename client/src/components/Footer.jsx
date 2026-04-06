import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Footer({ variant = 'default' }) {
    const { user, isLoggedIn } = useAuth();

    if (variant === 'portfolio') {
        return (
            <footer className="max-w-4xl mx-auto mt-20 pt-8 border-t border-white/5 text-center">
                <p className="text-sm text-surface-700 mb-6">
                    Built with <span className="gradient-text font-semibold">PortfolioGen</span>
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                    <Link to="/" className="text-sm text-surface-200 hover:text-primary-400 no-underline transition-colors">
                        Home
                    </Link>
                    {!user ? (
                        <>
                            <Link to="/login" className="text-sm text-surface-200 hover:text-primary-400 no-underline transition-colors">
                                Login
                            </Link>
                            <Link to="/register" className="text-sm font-semibold text-primary-400 hover:text-primary-300 no-underline transition-colors">
                                Generate Your Own Portfolio →
                            </Link>
                        </>
                    ) : (
                        <Link to="/create" className="text-sm font-semibold text-primary-400 hover:text-primary-300 no-underline transition-colors">
                            Create New Portfolio →
                        </Link>
                    )}
                </div>
            </footer>
        );
    }

    // Default — app-wide footer (Home, etc.)
    return (
        <footer className="glass w-full border-t border-white/5 bg-[#0a0f1c]/80 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

                {/* Top Row */}
                <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-12">

                    {/* Brand */}
                    <div className="flex flex-col gap-3 max-w-xs">
                        <span className="text-xl font-extrabold gradient-text tracking-tight">PortfolioGen</span>
                        <p className="text-sm text-surface-200 leading-relaxed">
                            Build a stunning portfolio in minutes. Share your work with the world instantly.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap gap-16">
                        <div className="flex flex-col gap-3">
                            <p className="text-xs font-semibold uppercase tracking-widest text-surface-700 mb-1">Product</p>
                            {isLoggedIn ? (
                                <Link to="/create" className="text-sm text-surface-200 hover:text-primary-400 transition-colors no-underline">Create Portfolio</Link>
                            ) : (
                                <Link to="/register" className="text-sm text-surface-200 hover:text-primary-400 transition-colors no-underline">Get Started</Link>
                            )}
                            <Link to="/login" className="text-sm text-surface-200 hover:text-primary-400 transition-colors no-underline">Sign In</Link>
                        </div>
                        <div className="flex flex-col gap-3">
                            <p className="text-xs font-semibold uppercase tracking-widest text-surface-700 mb-1">Company</p>
                            <a href="#" className="text-sm text-surface-200 hover:text-primary-400 transition-colors no-underline">About</a>
                            <a href="#" className="text-sm text-surface-200 hover:text-primary-400 transition-colors no-underline">Privacy Policy</a>
                            <a href="#" className="text-sm text-surface-200 hover:text-primary-400 transition-colors no-underline">Terms of Service</a>
                        </div>
                    </div>
                </div>

                {/* Bottom Row */}
                <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-surface-700">
                        © {new Date().getFullYear()} <span className="gradient-text font-semibold">PortfolioGen</span>. All rights reserved.
                    </p>
                    <p className="text-xs text-surface-700">
                        Built for developers, designers & creatives.
                    </p>
                </div>

            </div>
        </footer>
    );
}

export default Footer;