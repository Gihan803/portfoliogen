import { Globe } from 'lucide-react';
import ContactForm from './ContactForm';

const GithubIcon = (props) => (<svg {...props} viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
</svg>);
const LinkedinIcon = (props) => (<svg {...props} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
</svg>);

function ContactSection({ contact, username }) {
    if (!contact) return null;

    return (
        <section id="contact" className="max-w-4xl mx-auto mt-20">
            <div className="glass-card p-8 md:p-12 flex flex-col md:flex-row gap-12">
                {/* Left */}
                <div className="flex-1 flex flex-col">
                    <p className="text-xs font-semibold tracking-widest text-primary-400 uppercase mb-3">Connectivity</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">Get in Touch</h2>
                    <p className="text-surface-200 text-sm leading-relaxed max-w-xs mb-10">
                        Have a project in mind or just want to chat about the future of digital experience?
                    </p>
                    <div className="space-y-4 mb-10">
                        {contact.email && (
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                                    <span className="text-base">✉</span>
                                </div>
                                <div>
                                    <p className="text-xs text-surface-700 uppercase tracking-wider mb-0.5">Email</p>
                                    <a href={`mailto:${contact.email}`} className="text-sm text-white hover:text-primary-400 transition-colors no-underline">{contact.email}</a>
                                </div>
                            </div>
                        )}
                        {contact.location && (
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                                    <span className="text-base">◎</span>
                                </div>
                                <div>
                                    <p className="text-xs text-surface-700 uppercase tracking-wider mb-0.5">Location</p>
                                    <p className="text-sm text-white">{contact.location}</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-3 mt-auto">
                        {contact.github && (
                            <a href={contact.github} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-surface-200 hover:text-primary-400 hover:border-primary-500/40 transition-all no-underline">
                                <GithubIcon className="w-4 h-4" />
                            </a>
                        )}
                        {contact.website && (
                            <a href={contact.website} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-surface-200 hover:text-primary-400 hover:border-primary-500/40 transition-all no-underline">
                                <Globe size={16} />
                            </a>
                        )}
                        {contact.linkedin && (
                            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-surface-200 hover:text-primary-400 hover:border-primary-500/40 transition-all no-underline">
                                <LinkedinIcon className="w-4 h-4" />
                            </a>
                        )}
                    </div>
                </div>
                {/* Right */}
                <div className="flex-1">
                    <ContactForm username={username} />
                </div>
            </div>
        </section>
    );
}

export default ContactSection;