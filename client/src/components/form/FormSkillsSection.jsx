import { useState } from 'react';

function SkillsSection({ formData, setFormData }) {
    const [currentSkill, setCurrentSkill] = useState('');

    const addSkill = (e) => {
        e.preventDefault();
        const skill = currentSkill.trim();
        if (skill && !formData.skills.includes(skill)) {
            setFormData(prev => ({ ...prev, skills: [...prev.skills, skill] }));
            setCurrentSkill('');
        }
    };

    const removeSkill = (skillToRemove) => {
        setFormData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skillToRemove) }));
    };

    return (
        <div className="glass-card p-8">
            <h2 className="text-xl font-semibold mb-4 text-white">Skills</h2>
            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={currentSkill}
                    onChange={e => setCurrentSkill(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addSkill(e); } }}
                    placeholder="e.g. React, Node.js"
                    className="input-field"
                />
                <button type="button" onClick={addSkill} className="btn-secondary px-6 shrink-0">Add</button>
            </div>
            <div className="flex flex-wrap gap-3">
                {formData.skills.map((skill, i) => (
                    <span key={i} className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-primary-600/15 text-primary-300 border border-primary-500/20">
                        {skill}
                        <button type="button" onClick={() => removeSkill(skill)} className="hover:text-red-400 focus:outline-none font-bold">✕</button>
                    </span>
                ))}
            </div>
        </div>
    );
}

export default SkillsSection;