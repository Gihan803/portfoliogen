function ExperienceSection({ formData, handleExperienceChange, addExperience, removeExperience }) {
    return (
        <div className="glass-card p-8">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Experience</h2>
                <button type="button" onClick={addExperience} className="btn-secondary text-xs py-1.5 px-3">+ Add Experience</button>
            </div>
            {formData.experience.map((exp, i) => (
                <div key={i} className="mb-6 p-4 rounded-xl bg-white/[0.02] border border-white/5 relative">
                    {formData.experience.length > 1 && (
                        <button type="button" onClick={() => removeExperience(i)} className="absolute top-3 right-3 text-red-400 hover:text-red-300 text-sm bg-transparent border-none cursor-pointer">✕</button>
                    )}
                    <div className="space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <input name="company" value={exp.company} onChange={e => handleExperienceChange(i, e)} placeholder="Company" className="input-field" />
                            <input name="role" value={exp.role} onChange={e => handleExperienceChange(i, e)} placeholder="Role / Position" className="input-field" />
                        </div>
                        <input name="duration" value={exp.duration} onChange={e => handleExperienceChange(i, e)} placeholder="Duration (e.g. Jan 2023 - Present)" className="input-field" />
                        <textarea name="description" value={exp.description} onChange={e => handleExperienceChange(i, e)} placeholder="What did you do there?" rows={2} className="input-field resize-none" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ExperienceSection;