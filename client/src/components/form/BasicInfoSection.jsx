function BasicInfoSection({ formData, handleChange, getAboutImageProps, getAboutImageInputProps, isAboutImageDragActive, aboutImagePreview, uploadingAboutImage }) {
    return (
        <div className="glass-card p-8">
            <h2 className="text-xl font-semibold mb-4 text-white">Basic Info</h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-surface-200 mb-2">Professional Title</label>
                    <input name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Full Stack Developer" className="input-field" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-surface-200 mb-2">Bio</label>
                    <textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Tell us about yourself..." rows={4} maxLength={500} className="input-field resize-none" />
                    <p className="text-xs text-surface-700 mt-1">{formData.bio.length}/500</p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-surface-200 mb-2">About Me</label>
                    <textarea name="about" value={formData.about} onChange={handleChange} placeholder="The story behind the design..." rows={6} className="input-field resize-none" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-surface-200 mb-2">About Image (Optional)</label>
                    <div
                        {...getAboutImageProps()}
                        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-300 mb-3 ${isAboutImageDragActive ? 'border-primary-400 bg-primary-500/10' : 'border-white/10 hover:border-primary-500/30 hover:bg-white/[0.02]'
                            }`}
                    >
                        <input {...getAboutImageInputProps()} />
                        {aboutImagePreview ? (
                            <div className="flex flex-col items-center gap-3">
                                <img src={aboutImagePreview} alt="About preview" className="w-full max-w-[200px] h-32 object-cover rounded-lg border border-primary-500/30" />
                                <p className="text-sm text-surface-200">Click or drag to replace</p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center gap-2">
                                <div className="text-2xl text-surface-400">🖼️</div>
                                <p className="text-sm text-surface-200">{uploadingAboutImage ? 'Uploading image...' : 'Drag & drop an image, or click to browse'}</p>
                            </div>
                        )}
                    </div>
                    <label className="block text-xs text-surface-700 mb-1">Or paste image URL</label>
                    <input name="aboutImage" value={formData.aboutImage} onChange={handleChange} placeholder="https://example.com/about-image.jpg" className="input-field" />
                </div>
            </div>
        </div>
    );
}

export default BasicInfoSection;