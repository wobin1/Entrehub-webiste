'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Image as ImageIcon, Plus, Pencil, Trash2, Loader2, GripVertical } from 'lucide-react';
import PortfolioDialog from '@/components/admin/portfolio-dialog';
import { DeleteConfirmationModal } from '@/components/admin/DeleteConfirmationModal';

interface Project {
    id: string;
    title: string;
    category: string;
    description: string;
    image: string;
    metric: string;
    metricLabel: string;
    order: number;
}

export default function PortfolioAdminPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    // Delete modal state
    const [deleteModal, setDeleteModal] = useState<{
        isOpen: boolean;
        projectId: string;
        projectTitle: string;
    }>({
        isOpen: false,
        projectId: '',
        projectTitle: '',
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await fetch('/api/portfolio');
            if (res.ok) {
                const data = await res.json();
                setProjects(data);
            }
        } catch (error) {
            toast.error('Failed to fetch portfolio projects');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (project: Project) => {
        setSelectedProject(project);
        setIsDialogOpen(true);
    };

    const handleDeleteClick = (project: Project) => {
        setDeleteModal({
            isOpen: true,
            projectId: project.id,
            projectTitle: project.title,
        });
    };

    const confirmDelete = async () => {
        const { projectId } = deleteModal;
        try {
            const res = await fetch(`/api/portfolio/${projectId}`, { method: 'DELETE' });
            if (res.ok) {
                toast.success('Project deleted');
                fetchProjects();
            } else {
                toast.error('Failed to delete project');
            }
        } catch (error) {
            toast.error('An error occurred');
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-100 rounded-xl">
                        <ImageIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Portfolio</h1>
                        <p className="text-gray-500 text-sm">Manage your success stories</p>
                    </div>
                </div>

                <button
                    onClick={() => {
                        setSelectedProject(null);
                        setIsDialogOpen(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Project
                </button>
            </div>

            <div className="grid gap-4">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between group hover:border-blue-300 transition-colors"
                    >
                        <div className="flex items-center gap-4">
                            <div className="text-gray-400">
                                <GripVertical className="w-5 h-5" />
                            </div>
                            <div className="w-16 h-12 bg-gray-100 rounded-lg overflow-hidden relative">
                                <img src={project.image} alt={project.title} className="object-cover w-full h-full" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">{project.title}</h3>
                                <p className="text-sm text-gray-500 line-clamp-1">{project.category}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handleEdit(project)}
                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                                <Pencil className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => handleDeleteClick(project)}
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <PortfolioDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onSave={fetchProjects}
                project={selectedProject}
            />

            <DeleteConfirmationModal
                isOpen={deleteModal.isOpen}
                onOpenChange={(open) => setDeleteModal(prev => ({ ...prev, isOpen: open }))}
                onConfirm={confirmDelete}
                title="Delete Project"
                description="Are you sure you want to delete the project"
                itemName={deleteModal.projectTitle}
            />
        </div>
    );
}
