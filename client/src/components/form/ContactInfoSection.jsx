function ContactInfoSection({ formData, handleContactChange }) {
    return (
        <div className="glass-card p-8">
            <h2 className="text-xl font-semibold mb-4 text-white">Contact & Links</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-surface-200 mb-2">Email</label>
                    <input name="email" value={formData.contact.email} onChange={handleContactChange} placeholder="you@example.com" type="email" className="input-field" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-surface-200 mb-2">LinkedIn</label>
                    <input name="linkedin" value={formData.contact.linkedin} onChange={handleContactChange} placeholder="https://linkedin.com/in/yourprofile" className="input-field" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-surface-200 mb-2">GitHub</label>
                    <input name="github" value={formData.contact.github} onChange={handleContactChange} placeholder="https://github.com/yourusername" className="input-field" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-surface-200 mb-2">Website</label>
                    <input name="website" value={formData.contact.website} onChange={handleContactChange} placeholder="https://yourwebsite.com" className="input-field" />
                </div>
            </div>
        </div>
    );
}

export default ContactInfoSection;