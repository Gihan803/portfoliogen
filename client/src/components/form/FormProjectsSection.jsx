function ProjectsSection({ formData, handleProjectChange, addProject, removeProject }) {
    return (
        <div className="glass-card p-8">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Projects</h2>
                <button type="button" onClick={addProject} className="btn-secondary text-xs py-1.5 px-3">+ Add Project</button>
            </div>
            {formData.projects.map((project, i) => (
                <div key={i} className="mb-6 p-4 rounded-xl bg-white/[0.02] border border-white/5 relative">
                    {formData.projects.length > 1 && (
                        <button type="button" onClick={() => removeProject(i)} className="absolute top-3 right-3 text-red-400 hover:text-red-300 text-sm bg-transparent border-none cursor-pointer">✕</button>
                    )}
                    <div className="space-y-3">
                        <input name="name" value={project.name} onChange={e => handleProjectChange(i, e)} placeholder="Project Name *" className="input-field" required />
                        <textarea name="description" value={project.description} onChange={e => handleProjectChange(i, e)} placeholder="Brief description..." rows={2} className="input-field resize-none" />
                        <input name="techStack" value={project.techStack} onChange={e => handleProjectChange(i, e)} placeholder="Tech Stack (comma separated)" className="input-field" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <input name="githubLink" value={project.githubLink} onChange={e => handleProjectChange(i, e)} placeholder="GitHub URL" className="input-field" />
                            <input name="liveDemo" value={project.liveDemo} onChange={e => handleProjectChange(i, e)} placeholder="Live Demo URL" className="input-field" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ProjectsSection;