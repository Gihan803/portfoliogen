function HeroSection({ portfolio }) {
    return (
        <section id="home" className="max-w-4xl mx-auto mt-8 md:mt-12 text-center">
            {portfolio.profileImage && (
                <img
                    src={portfolio.profileImage}
                    alt={portfolio.fullName}
                    className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover mx-auto mb-6 border-4 border-primary-500/30 shadow-xl shadow-primary-500/10"
                />
            )}
            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-white">{portfolio.fullName}</h1>
            <p className="text-xl text-primary-400 font-medium mb-4">{portfolio.title}</p>
            {portfolio.bio && (
                <p className="max-w-2xl mx-auto text-surface-200 leading-relaxed mb-8">{portfolio.bio}</p>
            )}
        </section>
    );
}

export default HeroSection;