import { useState, useEffect, useRef } from 'react';

const links = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
];

function Navbar({ portfolio }) {
    const [active, setActive] = useState('Home');
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [visible, setVisible] = useState(true);
    const lastScrollY = useRef(0);

    // Scroll direction + background blur
    useEffect(() => {
        const handleScroll = () => {
            const currentY = window.scrollY;
            setScrolled(currentY > 20);

            if (currentY < 10) {
                setVisible(true);
            } else if (currentY > lastScrollY.current) {
                setVisible(false);
                setMobileOpen(false);
            } else {
                setVisible(true);
            }

            lastScrollY.current = currentY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Scroll spy — auto highlight active section
    useEffect(() => {
        const sectionIds = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
        const observers = sectionIds.map(id => {
            const el = document.getElementById(id);
            if (!el) return null;
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setActive(id.charAt(0).toUpperCase() + id.slice(1));
                    }
                },
                { threshold: 0.4 }
            );
            observer.observe(el);
            return observer;
        });
        return () => observers.forEach(o => o?.disconnect());
    }, []);

    const handleNav = (label, href) => {
        setActive(label);
        setMobileOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled ? 'bg-[#0a0f1c]/95 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-[#0d1225]'}
        border-b border-white/5
        ${visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
      `}>
                <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between md:justify-center">

                    {/* Mobile Name Logo */}
                    <div className="md:hidden font-bold text-white text-lg">
                        {portfolio.fullName}
                    </div>

                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex items-center gap-1">
                        {links.map(({ label, href }) => (
                            <button
                                key={label}
                                onClick={() => handleNav(label, href)}
                                className={`relative px-3 py-1.5 text-sm font-medium transition-colors rounded-md
                  ${active === label ? 'text-white' : 'text-surface-200 hover:text-white'}`}
                            >
                                {label}
                                {active === label && (
                                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-0.5 rounded-full bg-primary-500" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        className="md:hidden bg-transparent border-none cursor-pointer p-2 flex flex-col gap-1.5"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                    >
                        <span className={`block w-6 h-0.5 bg-surface-200 transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
                        <span className={`block w-6 h-0.5 bg-surface-200 transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
                        <span className={`block w-6 h-0.5 bg-surface-200 transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className={`md:hidden fixed top-14 left-0 right-0 z-40 bg-[#0d1225]/95 backdrop-blur-xl border-b border-white/5 shadow-2xl transition-all duration-300 overflow-hidden
        ${mobileOpen && visible ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}
      `}>
                <div className="p-4 space-y-2 flex flex-col">
                    {links.map(({ label, href }) => (
                        <button
                            key={label}
                            onClick={() => handleNav(label, href)}
                            className={`text-left px-4 py-3 text-sm font-medium rounded-lg transition-colors
                ${active === label
                                    ? 'bg-primary-500/10 text-primary-400'
                                    : 'text-surface-200 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Navbar;