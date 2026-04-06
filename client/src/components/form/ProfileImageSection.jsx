function ProfileImageSection({ getRootProps, getInputProps, isDragActive, imagePreview, uploading, formData, handleChange }) {
    return (
        <div className="glass-card p-8">
            <h2 className="text-xl font-semibold mb-4 text-white">Profile Image</h2>
            <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${isDragActive ? 'border-primary-400 bg-primary-500/10' : 'border-white/10 hover:border-primary-500/30 hover:bg-white/[0.02]'
                    }`}
            >
                <input {...getInputProps()} />
                {imagePreview ? (
                    <div className="flex flex-col items-center gap-4">
                        <img src={imagePreview} alt="Preview" className="w-28 h-28 rounded-full object-cover border-2 border-primary-500/30" />
                        <p className="text-sm text-surface-200">Click or drag to replace</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-3">
                        <div className="text-4xl">📸</div>
                        <p className="text-surface-200">{uploading ? 'Uploading...' : 'Drag & drop your photo, or click to browse'}</p>
                        <p className="text-xs text-surface-700">PNG, JPG, WEBP up to 5MB</p>
                    </div>
                )}
            </div>
            <div className="mt-4">
                <label className="block text-sm text-surface-700 mb-1">Or paste image URL</label>
                <input name="profileImage" value={formData.profileImage} onChange={handleChange} placeholder="https://example.com/photo.jpg" className="input-field" />
            </div>
        </div>
    );
}

export default ProfileImageSection;