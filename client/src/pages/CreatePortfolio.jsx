import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { portfolioAPI } from '../services/api';
import PortfolioForm from '../components/PortfolioForm';

const EMPTY_PORTFOLIO = {
  title: '',
  about: '',
  aboutImage: '',
  bio: '',
  profileImage: '',
  resumeUrl: '',
  contact: { email: '', linkedin: '', github: '', website: '' },
  skills: [],
  projects: [{ name: '', description: '', techStack: '', githubLink: '', liveDemo: '' }],
  experience: [{ company: '', role: '', duration: '', description: '' }],
};

function CreatePortfolio() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (payload) => {
    const finalPayload = {
      ...payload,
      username: user.username,
      fullName: user.fullName,
    };
    await portfolioAPI.create(finalPayload);
    setTimeout(() => navigate(`/portfolio/${user.username}`), 1500);
  };

  return (
    <div className="min-h-screen flex justify-center px-4 pt-10 pb-20">
      <PortfolioForm
        initialData={EMPTY_PORTFOLIO}
        onSubmit={handleSubmit}
        isEdit={false}
        username={user?.username}
      />
    </div>
  );
}

export default CreatePortfolio;