function ResumeCTA({ resumeUrl }) {
    if (!resumeUrl) return null;

    return (
        <section className="max-w-4xl mx-auto mt-20">
            <div className="glass-card p-12 md:p-16 text-center bg-[#0a0f1c]/80 border border-white/5 relative overflow-hidden">
                <div className="relative z-10">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
                        Ready to build something<br />remarkable?
                    </h2>
                    <p className="text-surface-200 text-base md:text-lg mb-10 max-w-xl mx-auto">
                        Let's turn your ideas into impactful digital experiences.
                    </p>
                    <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="btn-primary inline-block no-underline">
                        View Resume
                    </a>
                </div>
            </div>
        </section>
    );
}

export default ResumeCTA;