function ProjectsSection({ projects }) {
    if (!projects?.length) return null;

    return (
        <section id="projects" className="max-w-4xl mx-auto mt-16">
            <h2 className="text-2xl font-bold text-white mb-6">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project, i) => (
                    <div key={i} className="glass-card p-6">
                        <h3 className="text-lg font-bold text-white mb-2">{project.name}</h3>
                        {project.description && (
                            <p className="text-surface-200 text-sm mb-4 leading-relaxed">{project.description}</p>
                        )}
                        {project.techStack?.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.techStack.map((tech, j) => (
                                    <span key={j} className="text-xs px-2.5 py-1 rounded-md bg-white/5 text-surface-200 border border-white/5">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        )}
                        <div className="flex gap-4">
                            {project.githubLink && (
                                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-sm text-primary-400 hover:text-primary-300 no-underline">
                                    GitHub →
                                </a>
                            )}
                            {project.liveDemo && (
                                <a href={project.liveDemo} target="_blank" rel="noopener noreferrer" className="text-sm text-accent-400 hover:text-accent-500 no-underline">
                                    Live Demo →
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default ProjectsSection;