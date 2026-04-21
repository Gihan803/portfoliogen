import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';
import Testimonials from '../components/Testimonials';

function Home() {
  const { isLoggedIn } = useAuth();

  return (
    <div className="w-full h-full flex flex-col items-center justify-start pt-10 pb-20 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center text-center relative py-16 mt-10 overflow-hidden">
        {/* Background Glows safely contained */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-primary-600 opacity-15 blur-[100px] rounded-full z-0 pointer-events-none" />

        <div className="animate-fade-in-up relative z-10 w-full">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
            Build a <span className="gradient-text">Professional</span> <br className="hidden sm:block" />
            Portfolio in Minutes
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-surface-200 mb-12 leading-relaxed">
            Create a stunning, responsive portfolio to showcase your skills,
            projects, and experience. Share your unique URL with employers and peers instantly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {isLoggedIn ? (
              <Link to="/create" className="btn-primary no-underline text-lg px-8 py-4 w-full sm:w-auto text-center">
                Create Your Portfolio
              </Link>
            ) : (
              <>
                <Link to="/register" className="btn-primary no-underline text-lg px-8 py-4 w-full sm:w-auto text-center">
                  Get Started for Free
                </Link>
                <Link to="/login" className="btn-secondary no-underline text-lg px-8 py-4 w-full sm:w-auto text-center">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Spacer */}
      <div className="h-24 w-full" />

      {/* Feature Grid */}
      <section className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 py-12">
        {[
          {
            title: "Lightning Fast",
            desc: "Zero coding required. Simply fill in your details and your portfolio is ready to go.",
            icon: "⚡"
          },
          {
            title: "Premium Design",
            desc: "Every portfolio uses our sleek glassmorphism theme, designed to impress recruiters.",
            icon: "💎"
          },
          {
            title: "Image Uploads",
            desc: "Drag and drop your profile picture and project thumbnails with ease.",
            icon: "🖼️"
          }
        ].map((feature, i) => (
          <div
            key={i}
            className="glass-card p-8 flex flex-col items-start justify-start group hover:border-primary-500/30 transition-all duration-300"
            style={{ animationDelay: `${i * 150}ms` }}
          >
            <div className="text-4xl mb-6 group-hover:scale-110 transition-transform duration-300 block">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold mb-4 text-white">{feature.title}</h3>
            <p className="text-surface-200 leading-relaxed text-left">
              {feature.desc}
            </p>
          </div>
        ))}
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Spacer */}
      <div className="h-24 w-full" />

      {/* Social Proof / CTA Footer */}
      <section className="w-full max-w-4xl mx-auto text-center glass-card p-12 border-primary-500/20 relative z-10 my-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to stand out?</h2>
        <p className="text-lg text-surface-200 mb-8 max-w-xl mx-auto">
          Join thousands of developers and creatives using PortfolioGen to advance their careers.
        </p>
        <Link to={isLoggedIn ? "/create" : "/register"} className="btn-primary no-underline inline-block px-10 py-4 text-center">
          Start Building Now
        </Link>
      </section>
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
