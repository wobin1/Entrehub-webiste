'use client';

import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { IconPicker } from './IconPicker';

interface Service {
    id?: string;
    title: string;
    description: string;
    icon: string;
    included: string;
    order: number;
}

interface ServiceDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
    service: Service | null;
}

export default function ServiceDialog({
    isOpen,
    onClose,
    onSave,
    service,
}: ServiceDialogProps) {
    const [formData, setFormData] = useState<Service>({
        title: '',
        description: '',
        icon: 'Globe',
        included: "What's included in service?",
        order: 0,
    });
    const [isSaving, setIsSaving] = useState(false);
    const [isIconPickerOpen, setIsIconPickerOpen] = useState(false);

    useEffect(() => {
        if (service) {
            setFormData(service);
        } else {
            setFormData({
                title: '',
                description: '',
                icon: 'Globe',
                included: "What's included in service?",
                order: 0,
            });
        }
    }, [service]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            const url = service?.id
                ? `/api/services/${service.id}`
                : '/api/services';
            const method = service?.id ? 'PATCH' : 'POST';

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
            console.error('Error saving service:', error);
        } finally {
            setIsSaving(false);
        }
    };

    const SelectedIcon = (LucideIcons as unknown as Record<string, React.ElementType>)[formData.icon] || LucideIcons.HelpCircle;

    return (
        <>
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>{service ? 'Edit Service' : 'Add New Service'}</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Title
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
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
                                    Icon
                                </label>
                                <button
                                    type="button"
                                    onClick={() => setIsIconPickerOpen(true)}
                                    className="w-full flex items-center justify-between px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                                >
                                    <div className="flex items-center gap-2">
                                        <SelectedIcon className="w-5 h-5 text-blue-600" />
                                        <span className="text-sm text-gray-700">{formData.icon}</span>
                                    </div>
                                    <LucideIcons.ChevronDown className="w-4 h-4 text-gray-400" />
                                </button>
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
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                &quot;Included&quot; Label
                            </label>
                            <input
                                type="text"
                                value={formData.included}
                                onChange={(e) => setFormData({ ...formData, included: e.target.value })}
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
                                {service ? 'Save Changes' : 'Create Service'}
                            </button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            <IconPicker
                isOpen={isIconPickerOpen}
                onOpenChange={setIsIconPickerOpen}
                onSelect={(iconName) => setFormData({ ...formData, icon: iconName })}
                currentIcon={formData.icon}
            />
        </>
    );
}
