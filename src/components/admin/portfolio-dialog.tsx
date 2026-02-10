'use client';

import { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';

interface Project {
    id?: string;
    title: string;
    category: string;
    description: string;
    image: string;
    metric: string;
    metricLabel: string;
    order: number;
}

interface Category {
    id: string;
    name: string;
}

interface PortfolioDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
    project: Project | null;
}

export default function PortfolioDialog({
    isOpen,
    onClose,
    onSave,
    project,
}: PortfolioDialogProps) {
    const [formData, setFormData] = useState<Project>({
        title: '',
        category: '',
        description: '',
        image: '/images/img-1.jpg',
        metric: '',
        metricLabel: '',
        order: 0,
    });
    const [categories, setCategories] = useState<Category[]>([]);
    const [isSaving, setIsSaving] = useState(false);
    const [isLoadingCategories, setIsLoadingCategories] = useState(false);

    useEffect(() => {
        if (project) {
            setFormData(project);
        } else {
            setFormData({
                title: '',
                category: '',
                description: '',
                image: '/images/img-1.jpg',
                metric: '',
                metricLabel: '',
                order: 0,
            });
        }
    }, [project]);

    useEffect(() => {
        if (isOpen) {
            fetchCategories();
        }
    }, [isOpen]);

    const fetchCategories = async () => {
        setIsLoadingCategories(true);
        try {
            const res = await fetch('/api/blog/categories');
            if (res.ok) {
                const data = await res.json();
                setCategories(data.categories || []);
                // If adding new and category is empty, set to first category if available
                if (!project && data.categories?.length > 0 && !formData.category) {
                    setFormData(prev => ({ ...prev, category: data.categories[0].name }));
                }
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setIsLoadingCategories(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            const url = project?.id
                ? `/api/portfolio/${project.id}`
                : '/api/portfolio';
            const method = project?.id ? 'PATCH' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                onSave();
                onClose();
            }
        } catch (error) {
            console.error('Error saving project:', error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>{project ? 'Edit Project' : 'Add New Project'}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Title
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Category
                            </label>
                            <div className="relative">
                                <select
                                    required
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none font-medium"
                                    disabled={isLoadingCategories}
                                >
                                    <option value="" disabled>Select Category</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.name}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                                {isLoadingCategories && (
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                        <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            required
                            rows={3}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Metric (e.g. +50%)
                            </label>
                            <input
                                type="text"
                                value={formData.metric}
                                onChange={(e) => setFormData({ ...formData, metric: e.target.value })}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Metric Label
                            </label>
                            <input
                                type="text"
                                value={formData.metricLabel}
                                onChange={(e) => setFormData({ ...formData, metricLabel: e.target.value })}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Image URL
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Display Order
                        </label>
                        <input
                            type="number"
                            value={formData.order}
                            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                        >
                            {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                            {project ? 'Save Changes' : 'Create Project'}
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
