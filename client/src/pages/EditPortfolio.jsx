import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { portfolioAPI } from '../services/api';
import PortfolioForm from '../components/PortfolioForm';

const normalizePortfolioData = (p) => ({
  title: p.title || '',
  about: p.about || '',
  aboutImage: p.aboutImage || '',
  bio: p.bio || '',
  profileImage: p.profileImage || '',
  resumeUrl: p.resumeUrl || '',
  contact: {
    email: p.contact?.email || '',
    linkedin: p.contact?.linkedin || '',
    github: p.contact?.github || '',
    website: p.contact?.website || '',
  },
  skills: p.skills || [],
  projects: p.projects?.length
    ? p.projects.map((proj) => ({
      name: proj.name || '',
      description: proj.description || '',
      techStack: Array.isArray(proj.techStack) ? proj.techStack.join(', ') : (proj.techStack || ''),
      githubLink: proj.githubLink || '',
      liveDemo: proj.liveDemo || '',
    }))
    : [{ name: '', description: '', techStack: '', githubLink: '', liveDemo: '' }],
  experience: p.experience?.length
    ? p.experience.map((exp) => ({
      company: exp.company || '',
      role: exp.role || '',
      duration: exp.duration || '',
      description: exp.description || '',
    }))
    : [{ company: '', role: '', duration: '', description: '' }],
});

function EditPortfolio() {
  const { username } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch existing portfolio data
  useEffect(() => {
    // Ownership Guard
    if (user && user.username !== username) {
      toast.error('You are not authorized to edit this portfolio.');
      navigate('/');
      return;
    }
    const fetchPortfolio = async () => {
      try {
        const res = await portfolioAPI.get(username);
        setInitialData(normalizePortfolioData(res.data));
      } catch {
        setError('Failed to load portfolio data.');
        toast.error('Could not load portfolio.');
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, [username, user, navigate]);

  // Submit update
  const handleSubmit = async (payload) => {
    try {
      await portfolioAPI.update(username, payload);
      toast.success('Portfolio updated successfully!');
      navigate(`/portfolio/${username}`);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to update portfolio.');
      throw err; // Re-throw to let PortfolioForm handle UI states
    }
  };

  // Delete portfolio
  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete your portfolio? This cannot be undone.')) return;
    try {
      await portfolioAPI.delete(username);
      toast.success('Portfolio deleted successfully.');
      navigate('/');
    } catch {
      toast.error('Failed to delete portfolio.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-3 border-primary-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-surface-200">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (!initialData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-red-400">{error || 'Portfolio not found.'}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center px-4 pt-10 pb-20">
      <PortfolioForm
        initialData={initialData}
        onSubmit={handleSubmit}
        onDelete={handleDelete}
        isEdit={true}
        username={username}
      />
    </div>
  );
}

export default EditPortfolio;
