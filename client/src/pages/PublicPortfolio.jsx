import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { portfolioAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/portfolio/Navbar';
import HeroSection from '../components/portfolio/HeroSection';
import AboutSection from '../components/portfolio/AboutSection';
import SkillsSection from '../components/portfolio/SkillsSection';
import ProjectsSection from '../components/portfolio/ProjectsSection';
import ExperienceSection from '../components/portfolio/ExperienceSection';
import ContactSection from '../components/portfolio/ContactSection';
import ResumeCTA from '../components/portfolio/ResumeCTA';
import Footer from '../components/Footer';

function PublicPortfolio() {
  const { username } = useParams();
  const { user } = useAuth();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const isOwner = user?.username === username;

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await portfolioAPI.get(username);
        setPortfolio(res.data);
      } catch (err) {
        setError(err.response?.status === 404 ? 'Portfolio not found.' : 'Failed to load portfolio.');
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, [username]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-3 border-primary-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-surface-200">Loading portfolio...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <div className="text-6xl">😔</div>
      <h2 className="text-2xl font-bold text-white">{error}</h2>
      <p className="text-surface-200">The portfolio for <span className="text-primary-400">@{username}</span> doesn't exist yet.</p>
      {isOwner && <Link to="/create" className="btn-primary no-underline px-6 py-3">Create Your Portfolio</Link>}
    </div>
  );

  return (
    <div className="min-h-screen pb-20 px-4 pt-2">
      {/* Owner Edit Banner */}
      {isOwner && (
        <div className="max-w-4xl mx-auto mt-6 mb-4 p-3 rounded-xl bg-primary-600/10 border border-primary-500/20 flex items-center justify-between">
          <span className="text-sm text-primary-300">This is your portfolio</span>
          <div className="flex items-center gap-3">
            <Link to={`/edit/${username}`} className="btn-secondary text-xs py-1.5 px-4 no-underline">Edit Portfolio</Link>
            <button
              onClick={() => { navigator.clipboard.writeText(window.location.href); alert('Portfolio link copied!'); }}
              className="btn-primary text-xs py-1.5 px-4 shadow-lg shadow-primary-500/20"
            >
              Publish Portfolio
            </button>
          </div>
        </div>
      )}

      <Navbar portfolio={portfolio} username={username} />
      <HeroSection portfolio={portfolio} />
      <AboutSection portfolio={portfolio} />
      <SkillsSection skills={portfolio.skills} />
      <ProjectsSection projects={portfolio.projects} />
      <ExperienceSection experience={portfolio.experience} />
      <ContactSection contact={portfolio.contact} username={username} />
      <ResumeCTA resumeUrl={portfolio.resumeUrl} />
      <Footer variant="portfolio" />
    </div>
  );
}

export default PublicPortfolio;