function ExperienceSection({ experience }) {
    if (!experience?.length) return null;

    return (
        <section id="experience" className="max-w-4xl mx-auto mt-16">
            <h2 className="text-2xl font-bold text-white mb-6">Experience</h2>
            <div className="space-y-6">
                {experience.map((exp, i) => (
                    <div key={i} className="glass-card p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                            <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                            {exp.duration && (
                                <span className="text-sm text-surface-700 mt-1 md:mt-0">{exp.duration}</span>
                            )}
                        </div>
                        {exp.company && <p className="text-primary-400 font-medium mb-2">{exp.company}</p>}
                        {exp.description && <p className="text-surface-200 text-sm leading-relaxed">{exp.description}</p>}
                    </div>
                ))}
            </div>
        </section>
    );
}

export default ExperienceSection;