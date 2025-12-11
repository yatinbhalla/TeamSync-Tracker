import React, { useState, useMemo } from 'react';
import { Project } from '../types';
import { STATUS_OPTIONS } from '../constants';
import Button from './Button';
import ConfirmationModal from './ConfirmationModal';
import EditProjectModal from './EditProjectModal';

interface ProjectTableProps {
  projects: Project[];
  onDelete: (id: string) => void;
  onUpdate: (project: Project) => void;
}

type SortKey = 'name' | 'owner' | 'status';
type SortDirection = 'asc' | 'desc';

const ProjectTable: React.FC<ProjectTableProps> = ({ projects, onDelete, onUpdate }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<SortKey | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleExpand = (id: string) => {
    setExpandedId(current => current === id ? null : id);
  };

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const handleDeleteClick = (id: string) => {
    setProjectToDelete(id);
  };

  const handleEditClick = (project: Project) => {
    setProjectToEdit(project);
  };

  const confirmDelete = () => {
    if (projectToDelete) {
      onDelete(projectToDelete);
      setProjectToDelete(null);
    }
  };

  const cancelDelete = () => {
    setProjectToDelete(null);
  };

  const filteredAndSortedProjects = useMemo(() => {
    let result = projects;

    // Filter based on search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(project => 
        project.name.toLowerCase().includes(query) || 
        project.owner.toLowerCase().includes(query) ||
        project.status.toLowerCase().includes(query)
      );
    }

    // Sort
    if (!sortKey) return result;

    return [...result].sort((a, b) => {
      let aValue = a[sortKey];
      let bValue = b[sortKey];

      // Case insensitive string comparison
      if (typeof aValue === 'string') aValue = aValue.toLowerCase();
      if (typeof bValue === 'string') bValue = bValue.toLowerCase();

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [projects, sortKey, sortDirection, searchQuery]);

  const getStatusBadge = (status: string) => {
    const option = STATUS_OPTIONS.find(opt => opt.value === status);
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${option?.color || 'bg-gray-100 text-gray-800'}`}>
        {option?.label || status}
      </span>
    );
  };

  const SortIndicator = ({ column }: { column: SortKey }) => {
    const isActive = sortKey === column;
    const isDesc = isActive && sortDirection === 'desc';
    
    return (
      <span className={`ml-1 flex-shrink-0 transition-opacity duration-200 ${isActive ? 'opacity-100 text-indigo-500' : 'opacity-0 group-hover:opacity-100 text-gray-400'}`}>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isDesc ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          )}
        </svg>
      </span>
    );
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Search Bar */}
        <div className="p-4 border-b border-gray-100 bg-gray-50/50">
          <div className="relative max-w-md w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 md:py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-base md:text-sm transition duration-150 ease-in-out"
              placeholder="Search by project name, owner, or status..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Mobile Scroll Hint */}
        <div className="md:hidden bg-gray-50 px-4 py-2 border-b border-gray-100 flex items-center justify-end text-xs text-gray-400 italic">
          <span className="mr-1">Swipe to see more</span>
          <svg className="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>

        <div className="overflow-x-auto">
          {/* Added min-w-[800px] to ensure table doesn't squish on mobile */}
          <table className="min-w-[800px] md:min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-8">
                  {/* Chevron column */}
                </th>
                
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group select-none hover:bg-gray-200 transition-colors"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center">
                    Project Name
                    <SortIndicator column="name" />
                  </div>
                </th>
                
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group select-none hover:bg-gray-200 transition-colors"
                  onClick={() => handleSort('owner')}
                >
                  <div className="flex items-center">
                    Owner
                    <SortIndicator column="owner" />
                  </div>
                </th>
                
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group select-none hover:bg-gray-200 transition-colors"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center">
                    Status
                    <SortIndicator column="status" />
                  </div>
                </th>
                
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedProjects.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    <div className="flex flex-col items-center justify-center">
                      <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <p className="text-sm font-medium">
                        {searchQuery ? 'No matching projects found' : 'No projects yet'}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {searchQuery ? 'Try adjusting your search terms' : 'Add a project above or use AI to generate samples'}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredAndSortedProjects.map((project) => (
                  <React.Fragment key={project.id}>
                    <tr 
                      onClick={() => toggleExpand(project.id)}
                      className={`hover:bg-gray-50 transition-colors cursor-pointer ${expandedId === project.id ? 'bg-gray-50' : ''}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        <svg 
                          className={`w-5 h-5 transition-transform duration-200 ${expandedId === project.id ? 'transform rotate-90 text-indigo-500' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {project.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs mr-3">
                            {project.owner.charAt(0).toUpperCase()}
                          </div>
                          {project.owner}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {getStatusBadge(project.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div onClick={(e) => e.stopPropagation()} className="flex justify-end items-center">
                          <Button 
                            variant="ghost" 
                            onClick={() => handleEditClick(project)}
                            className="inline-flex text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 p-2 rounded-full transition-colors mr-1"
                            aria-label="Edit project"
                            title="Edit project"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </Button>
                          <Button 
                            variant="ghost" 
                            onClick={() => handleDeleteClick(project.id)}
                            className="inline-flex text-gray-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-full transition-colors"
                            aria-label="Delete project"
                            title="Delete project"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </Button>
                        </div>
                      </td>
                    </tr>
                    {expandedId === project.id && (
                      <tr className="bg-gray-50/50">
                        <td colSpan={5} className="px-6 py-4 sm:px-14 pb-6">
                          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm whitespace-normal">
                            <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Description</h4>
                            <p className="text-sm text-gray-700 leading-relaxed mb-4">
                              {project.description || "No description provided."}
                            </p>
                            <div className="flex items-center text-xs text-gray-400 border-t border-gray-100 pt-3 mt-2">
                              <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              Created: {new Date(project.createdAt).toLocaleDateString()} at {new Date(project.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <ConfirmationModal
        isOpen={!!projectToDelete}
        title="Delete Project"
        message="Are you sure you want to delete this project? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />

      <EditProjectModal 
        isOpen={!!projectToEdit}
        onClose={() => setProjectToEdit(null)}
        onSave={onUpdate}
        project={projectToEdit}
      />
    </>
  );
};

export default ProjectTable;