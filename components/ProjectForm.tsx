import React, { useState } from 'react';
import { Project, ProjectStatus } from '../types';
import { STATUS_OPTIONS } from '../constants';
import Button from './Button';

interface ProjectFormProps {
  onAddProject: (project: Omit<Project, 'id' | 'createdAt'>) => void;
  onGenerateAI: () => void;
  isGenerating: boolean;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ onAddProject, onGenerateAI, isGenerating }) => {
  const [name, setName] = useState('');
  const [owner, setOwner] = useState('');
  const [status, setStatus] = useState<ProjectStatus>(ProjectStatus.NOT_STARTED);
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !owner.trim()) return;

    onAddProject({ 
      name, 
      owner, 
      status, 
      description: description.trim() || 'No description provided.' 
    });
    
    setName('');
    setOwner('');
    setStatus(ProjectStatus.NOT_STARTED);
    setDescription('');
  };

  // Shared input class with responsive padding and text size
  const inputClass = "w-full rounded-lg border-gray-300 bg-white text-gray-900 shadow-sm focus:border-green-700 focus:ring-green-700 py-3 px-4 text-base md:py-2.5 md:px-3 md:text-sm border transition-all";

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8 relative z-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          <svg className="w-5 h-5 text-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add New Project
        </h2>
        <Button 
          type="button" 
          variant="secondary" 
          onClick={onGenerateAI} 
          isLoading={isGenerating}
          className="text-sm py-1.5"
        >
          ✨ AI Fill
        </Button>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
          <div className="md:col-span-5">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 md:mb-1.5">
              Project Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Website Redesign"
              className={inputClass}
              required
            />
          </div>

          <div className="md:col-span-4">
            <label htmlFor="owner" className="block text-sm font-medium text-gray-700 mb-2 md:mb-1.5">
              Owner
            </label>
            <input
              id="owner"
              type="text"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              placeholder="e.g. Jane Doe"
              className={inputClass}
              required
            />
          </div>

          <div className="md:col-span-3">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2 md:mb-1.5">
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as ProjectStatus)}
              className={inputClass}
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2 md:mb-1.5">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief details about the project..."
            rows={2}
            className={`${inputClass} resize-none`}
          />
        </div>

        <div className="flex justify-end pt-2">
          <Button 
            type="submit" 
            variant="success"
            className="w-full md:w-auto px-8 py-3 md:py-2 font-bold transform active:scale-95 transition-all text-base md:text-sm"
          >
            + Add New Projects
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;