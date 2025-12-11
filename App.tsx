import React, { useState } from 'react';
import ProjectForm from './components/ProjectForm';
import ProjectTable from './components/ProjectTable';
import { Project } from './types';
import { generateSampleProjects } from './services/geminiService';

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleAddProject = (newProject: Omit<Project, 'id' | 'createdAt'>) => {
    const project: Project = {
      ...newProject,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    setProjects(prev => [project, ...prev]);
  };

  const handleUpdateProject = (updatedProject: Project) => {
    setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
  };

  const handleDeleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const handleGenerateAI = async () => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    try {
      const samples = await generateSampleProjects();
      const projectsWithIds = samples.map(p => ({
        ...p,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      }));
      setProjects(prev => [...projectsWithIds, ...prev]);
    } catch (err) {
      console.error("Error adding generated projects", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Full width Dark Blue Header */}
      <header className="bg-blue-950 shadow-lg pb-12 pt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-extrabold text-white sm:text-4xl tracking-tight">
            Team Project Tracker
          </h1>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-blue-200">
            Manage your team's progress with a simple, effective dashboard.
          </p>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <ProjectForm 
          onAddProject={handleAddProject} 
          onGenerateAI={handleGenerateAI}
          isGenerating={isGenerating}
        />

        <div className="mb-12">
          <ProjectTable 
            projects={projects} 
            onDelete={handleDeleteProject}
            onUpdate={handleUpdateProject}
          />
        </div>
      </div>
    </div>
  );
};

export default App;