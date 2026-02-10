'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Info, Save, Loader2, ChevronDown } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { IconPicker } from '@/components/admin/IconPicker';

interface AboutSection {
    id: string;
    type: string;
    title: string;
    content: string;
    icon: string | null;
}

export default function AboutAdminPage() {
    const [items, setItems] = useState<AboutSection[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState<string | null>(null);
    const [iconPickerState, setIconPickerState] = useState<{
        isOpen: boolean;
        itemId: string | null;
    }>({
        isOpen: false,
        itemId: null,
    });

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        try {
            const res = await fetch('/api/about');
            if (res.ok) {
                const data = await res.json();
                setItems(data);
            }
        } catch (_error) {
            toast.error('Failed to fetch about items');
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdate = async (item: AboutSection) => {
        setIsSaving(item.id);
        try {
            const res = await fetch('/api/about', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item),
            });

            if (res.ok) {
                toast.success(`${item.title} updated successfully`);
            } else {
                toast.error(`Failed to update ${item.title}`);
            }
        } catch (_error) {
            toast.error('An error occurred');
        } finally {
            setIsSaving(null);
        }
    };

    const handleChange = (id: string, field: keyof AboutSection, value: string) => {
        setItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
        );
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-blue-100 rounded-xl">
                    <Info className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">About Section</h1>
                    <p className="text-gray-500 text-sm">Manage Mission, Vision, and Core Values</p>
                </div>
            </div>

            <div className="space-y-6">
                {items.map((item) => {
                    const SelectedIcon = (LucideIcons as unknown as Record<string, React.ElementType>)[item.icon || ''] || LucideIcons.HelpCircle;

                    return (
                        <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-bold text-gray-900 capitalize">{item.type}</h2>
                                <button
                                    onClick={() => handleUpdate(item)}
                                    disabled={isSaving === item.id}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 font-medium"
                                >
                                    {isSaving === item.id ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Save className="w-4 h-4" />
                                    )}
                                    Save Changes
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            value={item.title}
                                            onChange={(e) => handleChange(item.id, 'title', e.target.value)}
                                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Icon
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => setIconPickerState({ isOpen: true, itemId: item.id })}
                                            className="w-full flex items-center justify-between px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                                        >
                                            <div className="flex items-center gap-2">
                                                <SelectedIcon className="w-5 h-5 text-blue-600" />
                                                <span className="text-sm text-gray-700 font-medium">{item.icon || 'Select Icon'}</span>
                                            </div>
                                            <ChevronDown className="w-4 h-4 text-gray-400" />
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Content
                                    </label>
                                    <textarea
                                        rows={3}
                                        value={item.content}
                                        onChange={(e) => handleChange(item.id, 'content', e.target.value)}
                                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-medium"
                                    />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <IconPicker
                isOpen={iconPickerState.isOpen}
                onOpenChange={(open) => setIconPickerState(prev => ({ ...prev, isOpen: open }))}
                onSelect={(iconName) => {
                    if (iconPickerState.itemId) {
                        handleChange(iconPickerState.itemId, 'icon', iconName);
                    }
                }}
                currentIcon={items.find(i => i.id === iconPickerState.itemId)?.icon}
            />
        </div>
    );
}
