import { useState } from 'react';
import { portfolioAPI } from '../../services/api';

function ContactForm({ username }) {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState(''); // '' | 'sending' | 'sent' | 'error'

    const handleSubmit = async () => {
        if (!form.name || !form.email || !form.message) return;
        setStatus('sending');

        try {
            await portfolioAPI.contact(username, {
                name: form.name,
                email: form.email,
                message: form.message,
            });

            setStatus('sent');
            setForm({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('❌ Contact Error:', error);
            setStatus('error');
        }
    };

    return (
        <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="text-xs text-surface-700 uppercase tracking-wider mb-1.5 block">Name</label>
                    <input
                        type="text"
                        placeholder="Your Name"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-surface-700 focus:outline-none focus:border-primary-500/50 transition-colors"
                    />
                </div>
                <div>
                    <label className="text-xs text-surface-700 uppercase tracking-wider mb-1.5 block">Email</label>
                    <input
                        type="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-surface-700 focus:outline-none focus:border-primary-500/50 transition-colors"
                    />
                </div>
            </div>

            <div>
                <label className="text-xs text-surface-700 uppercase tracking-wider mb-1.5 block">Message</label>
                <textarea
                    rows={5}
                    placeholder="Tell me about your vision..."
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-surface-700 focus:outline-none focus:border-primary-500/50 transition-colors resize-none"
                />
            </div>

            {/* Status Messages */}
            {status === 'error' && (
                <p className="text-xs text-red-400">Something went wrong. Please try again.</p>
            )}

            <button
                onClick={handleSubmit}
                disabled={status === 'sending' || status === 'sent'}
                className="w-full bg-primary-600 hover:bg-primary-500 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors text-sm flex items-center justify-center gap-2"
            >
                {status === 'sent' ? '✓ Message Sent!' :
                    status === 'sending' ? 'Sending…' :
                        'Send Message ▶'}
            </button>
        </div>
    );
}

export default ContactForm;