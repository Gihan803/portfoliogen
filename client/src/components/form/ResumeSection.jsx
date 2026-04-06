function ResumeSection({ getResumeProps, getResumeInputProps, isResumeDragActive, uploadingResume, formData, handleChange }) {
    return (
        <div className="glass-card p-8">
            <h2 className="text-xl font-semibold mb-4 text-white">Resume (PDF)</h2>
            <div
                {...getResumeProps()}
                className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${isResumeDragActive ? 'border-primary-400 bg-primary-500/10' : 'border-white/10 hover:border-primary-500/30 hover:bg-white/[0.02]'
                    }`}
            >
                <input {...getResumeInputProps()} />
                {formData.resumeUrl ? (
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-16 h-16 rounded-xl bg-primary-500/20 text-primary-400 flex items-center justify-center text-3xl">📄</div>
                        <p className="text-sm text-primary-400 font-medium">PDF Uploaded Successfully!</p>
                        <p className="text-xs text-surface-200">Click or drag to replace current resume</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-3">
                        <div className="text-4xl text-surface-400">📄</div>
                        <p className="text-surface-200">{uploadingResume ? 'Uploading PDF...' : 'Drag & drop your resume PDF, or click to browse'}</p>
                        <p className="text-xs text-surface-700">PDFs up to 10MB</p>
                    </div>
                )}
            </div>
            <div className="mt-4">
                <label className="block text-sm text-surface-700 mb-1">Or paste Google Drive/PDF URL</label>
                <input name="resumeUrl" value={formData.resumeUrl} onChange={handleChange} placeholder="https://example.com/resume.pdf" className="input-field" />
            </div>
        </div>
    );
}

export default ResumeSection;