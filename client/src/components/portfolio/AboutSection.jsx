function AboutSection({ portfolio }) {
    if (!portfolio.about) return null;

    return (
        <section id="about" className="max-w-4xl mx-auto mt-20">
            <div className="glass-card p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center">
                {portfolio.aboutImage && (
                    <div className="flex-shrink-0">
                        <div className="w-60 h-70 rounded-3xl overflow-hidden border border-primary-500/20 shadow-2xl shadow-primary-900/40">
                            <img src={portfolio.aboutImage} alt="About visual" className="w-full h-full object-cover" />
                        </div>
                    </div>
                )}
                <div className="flex-1">
                    <h2 className="text-3xl font-bold text-white mb-4">The short story about me..</h2>
                    <div className="space-y-3 text-surface-200 text-sm leading-relaxed">
                        {portfolio.about.split('\n\n').map((paragraph, i) => (
                            <p key={i}>{paragraph}</p>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutSection;