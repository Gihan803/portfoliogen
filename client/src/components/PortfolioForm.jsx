import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { uploadAPI } from '../services/api';
import ProfileImageSection from './form/ProfileImageSection';
import ResumeSection from './form/ResumeSection';
import BasicInfoSection from './form/BasicInfoSection';
import ContactInfoSection from './form/ContactInfoSection';
import SkillsSection from './form/FormSkillsSection';
import ProjectsSection from './form/FormProjectsSection';
import ExperienceSection from './form/FormExperienceSection';

function PortfolioForm({ initialData, onSubmit, onDelete, isEdit, username }) {
  const [formData, setFormData] = useState(initialData);
  const [imagePreview, setImagePreview] = useState(initialData.profileImage || null);
  const [aboutImagePreview, setAboutImagePreview] = useState(initialData.aboutImage || null);
  const [uploading, setUploading] = useState(false);
  const [uploadingAboutImage, setUploadingAboutImage] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isDirty, setIsDirty] = useState(false);

  // Generic File Upload Handler
  const handleFileUpload = async (file, type) => {
    if (!file) return;

    const setLoader = {
      profile: setUploading,
      about: setUploadingAboutImage,
      resume: setUploadingResume
    }[type];

    const previewSetter = {
      profile: setImagePreview,
      about: setAboutImagePreview
    }[type];

    const apiCall = type === 'resume' ? uploadAPI.uploadResume : uploadAPI.uploadImage;

    if (previewSetter) {
      const reader = new FileReader();
      reader.onload = () => previewSetter(reader.result);
      reader.readAsDataURL(file);
    }

    setLoader(true);
    try {
      const data = await apiCall(file);
      const url = data.url || data.secure_url;
      const field = { profile: 'profileImage', about: 'aboutImage', resume: 'resumeUrl' }[type];
      setFormData(prev => ({ ...prev, [field]: url }));
      setIsDirty(true);
    } catch {
      setError(`${type.charAt(0).toUpperCase() + type.slice(1)} upload failed.`);
    } finally {
      setLoader(false);
    }
  };

  // Browser-level Dirty State warning
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isDirty]);

  // Dropzone Handlers
  const onDrop = useCallback((files) => handleFileUpload(files[0], 'profile'), []);
  const onResumeDrop = useCallback((files) => handleFileUpload(files[0], 'resume'), []);
  const onAboutImageDrop = useCallback((files) => handleFileUpload(files[0], 'about'), []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': [] }, maxFiles: 1, maxSize: 5 * 1024 * 1024 });
  const { getRootProps: getResumeProps, getInputProps: getResumeInputProps, isDragActive: isResumeDragActive } = useDropzone({ onDrop: onResumeDrop, accept: { 'application/pdf': ['.pdf'] }, maxFiles: 1, maxSize: 10 * 1024 * 1024 });
  const { getRootProps: getAboutImageProps, getInputProps: getAboutImageInputProps, isDragActive: isAboutImageDragActive } = useDropzone({ onDrop: onAboutImageDrop, accept: { 'image/*': [] }, maxFiles: 1, maxSize: 5 * 1024 * 1024 });

  // Handlers
  const handleChange = e => {
    setIsDirty(true);
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleContactChange = e => {
    setIsDirty(true);
    setFormData(prev => ({ ...prev, contact: { ...prev.contact, [e.target.name]: e.target.value } }));
  };

  const handleProjectChange = (index, e) => {
    setIsDirty(true);
    const updated = [...formData.projects];
    updated[index] = { ...updated[index], [e.target.name]: e.target.value };
    setFormData(prev => ({ ...prev, projects: updated }));
  };
  const addProject = () => {
    setIsDirty(true);
    setFormData(prev => ({ ...prev, projects: [...prev.projects, { name: '', description: '', techStack: '', githubLink: '', liveDemo: '' }] }));
  };
  const removeProject = index => {
    if (formData.projects.length <= 1) return;
    setIsDirty(true);
    setFormData(prev => ({ ...prev, projects: prev.projects.filter((_, i) => i !== index) }));
  };

  const handleExperienceChange = (index, e) => {
    setIsDirty(true);
    const updated = [...formData.experience];
    updated[index] = { ...updated[index], [e.target.name]: e.target.value };
    setFormData(prev => ({ ...prev, experience: updated }));
  };
  const addExperience = () => {
    setIsDirty(true);
    setFormData(prev => ({ ...prev, experience: [...prev.experience, { company: '', role: '', duration: '', description: '' }] }));
  };
  const removeExperience = index => {
    if (formData.experience.length <= 1) return;
    setIsDirty(true);
    setFormData(prev => ({ ...prev, experience: prev.experience.filter((_, i) => i !== index) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess(''); setSubmitting(true);
    try {
      const payload = {
        ...formData,
        projects: formData.projects.map(p => ({
          ...p,
          techStack: typeof p.techStack === 'string' ? p.techStack.split(',').map(s => s.trim()).filter(Boolean) : p.techStack,
        })),
      };
      await onSubmit(payload);
      setIsDirty(false); // Reset dirty state on success
      setSuccess(isEdit ? 'Portfolio updated successfully!' : 'Portfolio created successfully!');
    } catch (err) {
      setError(err.response?.data?.error || (isEdit ? 'Failed to update.' : 'Failed to create.'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-3xl animate-fade-in-up">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-3">
          {isEdit ? 'Edit Your' : 'Create Your'} <span className="gradient-text">Portfolio</span>
        </h1>
        <p className="text-surface-200">
          {isEdit ? 'Update your information below' : <>Fill in the details below. Your portfolio will be live at <span className="text-primary-400 font-medium">/portfolio/{username}</span></>}
        </p>
      </div>

      {error && <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>}
      {success && <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-8">
        <ProfileImageSection getRootProps={getRootProps} getInputProps={getInputProps} isDragActive={isDragActive} imagePreview={imagePreview} uploading={uploading} formData={formData} handleChange={handleChange} />
        <ResumeSection getResumeProps={getResumeProps} getResumeInputProps={getResumeInputProps} isResumeDragActive={isResumeDragActive} uploadingResume={uploadingResume} formData={formData} handleChange={handleChange} />
        <BasicInfoSection formData={formData} handleChange={handleChange} getAboutImageProps={getAboutImageProps} getAboutImageInputProps={getAboutImageInputProps} isAboutImageDragActive={isAboutImageDragActive} aboutImagePreview={aboutImagePreview} uploadingAboutImage={uploadingAboutImage} />
        <ContactInfoSection formData={formData} handleContactChange={handleContactChange} />
        <SkillsSection formData={formData} setFormData={setFormData} />
        <ProjectsSection formData={formData} handleProjectChange={handleProjectChange} addProject={addProject} removeProject={removeProject} />
        <ExperienceSection formData={formData} handleExperienceChange={handleExperienceChange} addExperience={addExperience} removeExperience={removeExperience} />

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button type="submit" disabled={submitting} className="btn-primary flex-1 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed">
            {submitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {isEdit ? 'Saving...' : 'Creating Portfolio...'}
              </span>
            ) : isEdit ? 'Save Changes' : 'Create Portfolio'}
          </button>
          {isEdit && onDelete && (
            <button type="button" onClick={onDelete} className="py-4 px-6 rounded-xl text-red-400 border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 transition-all cursor-pointer font-semibold">
              Delete Portfolio
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default PortfolioForm;