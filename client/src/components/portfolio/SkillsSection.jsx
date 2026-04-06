function SkillsSection({ skills }) {
    if (!skills?.length) return null;

    return (
        <section id="skills" className="max-w-4xl mx-auto mt-12">
            <h2 className="text-2xl font-bold text-white mb-6">Skills</h2>
            <div className="flex flex-wrap gap-3">
                {skills.map((skill, i) => (
                    <span key={i} className="px-4 py-2 rounded-full text-sm font-medium bg-primary-600/15 text-primary-300 border border-primary-500/20">
                        {skill}
                    </span>
                ))}
            </div>
        </section>
    );
}

export default SkillsSection;