import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    role: 'Creative Director',
    feedback: 'This portfolio generator is a game-changer! I created my professional site in minutes.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=sarah'
  },
  {
    id: 2,
    name: 'David Chen',
    role: 'Full Stack Developer',
    feedback: 'The glassmorphism design is gorgeous. It makes my projects look expensive and professional.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=david'
  },
  {
    id: 3,
    name: 'Elena Rodriguez',
    role: 'UI/UX Designer',
    feedback: 'Perfect for showcasing design work. The layout is clean and the responsiveness is spot on.',
    rating: 4,
    avatar: 'https://i.pravatar.cc/150?u=elena'
  },
  {
    id: 4,
    name: 'Marcus Thorne',
    role: 'Freelance Architect',
    feedback: 'Finally, a portfolio tool that doesn\'t feel like a template. It feels like a high-end designer built it for me.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=marcus'
  },
  {
    id: 5,
    name: 'Aisha Khan',
    role: 'Product Manager',
    feedback: 'I love how easy it is to share my portfolio. The URL is clean and the mobile performance is incredible.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=aisha'
  },
  {
    id: 6,
    name: 'Oliver Smoot',
    role: 'Student @ Stanford',
    feedback: 'Helped me land my first internship. recruiters specifically mentioned how clean my portfolio looked.',
    rating: 5,
    avatar: 'https://i.pravatar.cc/150?u=oliver'
  }
];

function Testimonials() {
  // Duplicate the array for seamless scrolling
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="w-full py-20 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 mb-12 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">
          Trusted by <span className="gradient-text">thousands</span>
        </h2>
        <p className="text-surface-200 text-lg">See what creators are saying about PortfolioGen</p>
      </div>

      <div className="flex pause-on-hover px-4">
        <div className="flex gap-6 animate-marquee">
          {duplicatedTestimonials.map((item, index) => (
            <div
              key={index}
              className="glass-card p-6 w-[300px] md:w-[400px] shrink-0"
            >
              <div className="flex gap-1 mb-4 text-accent-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < item.rating ? "currentColor" : "none"}
                    className={i < item.rating ? "" : "text-surface-700"}
                  />
                ))}
              </div>
              <p className="text-surface-100 mb-6 italic">"{item.feedback}"</p>
              <div className="flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-10 h-10 rounded-full border border-primary-500/30"
                />
                <div>
                  <h4 className="font-bold text-white text-sm">{item.name}</h4>
                  <p className="text-xs text-surface-400">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Side Fade Gradients */}
      <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-surface-950 to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-surface-950 to-transparent z-10 pointer-events-none" />
    </section>
  );
}

export default Testimonials;
