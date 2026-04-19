'use client';

import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Loader2, Calendar as CalendarIcon, Link as LinkIcon, FileText, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface Webinar {
    id?: string;
    title: string;
    description?: string;
    scheduledAt: string | Date;
    meetingLink?: string;
    isActive: boolean;
}

interface WebinarFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
    webinar: Webinar | null;
}

export default function WebinarForm({
    isOpen,
    onClose,
    onSave,
    webinar,
}: WebinarFormProps) {
    const [formData, setFormData] = useState<Webinar>({
        title: '',
        description: '',
        scheduledAt: '',
        meetingLink: '',
        isActive: true,
    });
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (webinar) {
            // Format date for datetime-local input
            const date = new Date(webinar.scheduledAt);
            const formattedDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
                .toISOString()
                .slice(0, 16);
            
            setFormData({
                ...webinar,
                description: webinar.description || '',
                meetingLink: webinar.meetingLink || '',
                scheduledAt: formattedDate,
            });
        } else {
            setFormData({
                title: '',
                description: '',
                scheduledAt: '',
                meetingLink: '',
                isActive: true,
            });
        }
    }, [webinar, isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        const token = localStorage.getItem('admin_token');

        try {
            const url = webinar?.id
                ? `/api/admin/webinar/${webinar.id}`
                : '/api/admin/webinar';
            const method = webinar?.id ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...formData,
                    scheduledAt: new Date(formData.scheduledAt).toISOString()
                }),
            });

            if (res.ok) {
                onSave();
                onClose();
            } else {
                const data = await res.json();
                alert(data.error || 'Failed to save webinar');
            }
        } catch (error) {
            console.error('Error saving webinar:', error);
            alert('An error occurred while saving the webinar');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>{webinar ? 'Edit Webinar' : 'Schedule New Webinar'}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Webinar Title</Label>
                        <div className="relative">
                            <FileText className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                            <Input
                                id="title"
                                required
                                placeholder="e.g. Mastering Business Growth in 2026"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="pl-10"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description (Optional)</Label>
                        <textarea
                            id="description"
                            rows={3}
                            placeholder="Briefly describe what the webinar is about..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="scheduledAt">Schedule Date & Time</Label>
                            <div className="relative">
                                <CalendarIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                <Input
                                    id="scheduledAt"
                                    type="datetime-local"
                                    required
                                    value={formData.scheduledAt as string}
                                    onChange={(e) => setFormData({ ...formData, scheduledAt: e.target.value })}
                                    className="pl-10"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="meetingLink">Meeting Link (Optional)</Label>
                            <div className="relative">
                                <LinkIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                                <Input
                                    id="meetingLink"
                                    type="url"
                                    placeholder="https://zoom.us/j/..."
                                    value={formData.meetingLink}
                                    onChange={(e) => setFormData({ ...formData, meetingLink: e.target.value })}
                                    className="pl-10"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-2 bg-blue-50 p-4 rounded-xl">
                        <Checkbox 
                            id="isActive" 
                            checked={formData.isActive}
                            onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked === true })}
                        />
                        <div className="grid gap-1.5 leading-none">
                            <Label htmlFor="isActive" className="text-sm font-medium flex items-center gap-2">
                                Set as Active Webinar
                                <CheckCircle className="w-3 h-3 text-blue-600" />
                            </Label>
                            <p className="text-xs text-gray-500">
                                This will be the webinar shown on the registration page. Deactivates other webinars.
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-4">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isSaving}
                            className="bg-blue-600 hover:bg-blue-700 text-white min-w-[140px]"
                        >
                            {isSaving ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                    Saving...
                                </>
                            ) : (
                                webinar ? 'Update Webinar' : 'Schedule Webinar'
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
