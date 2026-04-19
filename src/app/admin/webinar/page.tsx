'use client';

import React, { useState, useEffect } from 'react';
import {
    Plus,
    Calendar,
    Users,
    Edit2,
    Trash2,
    CheckCircle2,
    XCircle,
    ChevronRight,
    Loader2,
    User,
    Mail,
    Phone,
    MapPin,
    Briefcase
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import WebinarForm from '@/components/admin/WebinarForm';
import { DeleteConfirmationModal } from '@/components/admin/DeleteConfirmationModal';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface WebinarRegistration {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    jobTitle?: string;
    companyName?: string;
    country: string;
    state?: string;
    city?: string;
    industry: string;
    createdAt: string;
}

interface Webinar {
    id: string;
    title: string;
    description?: string;
    scheduledAt: string;
    meetingLink?: string;
    isActive: boolean;
    registrations?: WebinarRegistration[];
    _count?: {
        registrations: number;
    };
}

export default function WebinarManagementPage() {
    const [webinars, setWebinars] = useState<Webinar[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedWebinar, setSelectedWebinar] = useState<Webinar | null>(null);
    const [isRegistrantsVisible, setIsRegistrantsVisible] = useState(false);
    const [selectedWebinarWithRegistrants, setSelectedWebinarWithRegistrants] = useState<Webinar | null>(null);

    const fetchWebinars = async () => {
        setIsLoading(true);
        const token = localStorage.getItem('admin_token');
        try {
            const res = await fetch('/api/admin/webinar', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setWebinars(data.webinars);
            }
        } catch (error) {
            console.error('Error fetching webinars:', error);
            toast.error('Failed to load webinars');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchWebinarDetails = async (id: string) => {
        const token = localStorage.getItem('admin_token');
        try {
            const res = await fetch(`/api/admin/webinar/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setSelectedWebinarWithRegistrants(data.webinar);
                setIsRegistrantsVisible(true);
            }
        } catch (error) {
            console.error('Error fetching webinar details:', error);
            toast.error('Failed to load registrations');
        }
    };

    useEffect(() => {
        fetchWebinars();
    }, []);

    const handleDelete = async () => {
        if (!selectedWebinar) return;

        const token = localStorage.getItem('admin_token');
        try {
            const res = await fetch(`/api/admin/webinar/${selectedWebinar.id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                toast.success('Webinar deleted successfully');
                fetchWebinars();
            }
        } catch (error) {
            console.error('Error deleting webinar:', error);
            toast.error('Failed to delete webinar');
        } finally {
            setIsDeleteModalOpen(false);
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
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                        Webinar Management
                    </h1>
                    <p className="text-gray-500 mt-1">Schedule and manage your webinars and participants.</p>
                </div>
                <Button 
                    onClick={() => {
                        setSelectedWebinar(null);
                        setIsFormOpen(true);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white gap-2 h-11 px-6 rounded-xl"
                >
                    <Plus className="w-4 h-4" />
                    New Webinar
                </Button>
            </div>

            {/* Webinar List */}
            <div className="grid gap-4">
                {webinars.map((webinar) => (
                    <div 
                        key={webinar.id}
                        className={`bg-white rounded-2xl border ${webinar.isActive ? 'border-blue-200 shadow-sm' : 'border-gray-100'} p-6 transition-all hover:border-blue-300`}
                    >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-3">
                                    <h3 className="text-lg font-bold text-gray-900">{webinar.title}</h3>
                                    {webinar.isActive ? (
                                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold border border-green-100">
                                            <CheckCircle2 className="w-3 h-3" />
                                            ACTIVE
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-50 text-gray-500 text-xs font-bold border border-gray-100">
                                            <XCircle className="w-3 h-3" />
                                            PAST / INACTIVE
                                        </span>
                                    )}
                                </div>
                                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                    <span className="flex items-center gap-1.5">
                                        <Calendar className="w-4 h-4 text-blue-600" />
                                        {format(new Date(webinar.scheduledAt), 'PPP p')}
                                    </span>
                                    <button 
                                        onClick={() => fetchWebinarDetails(webinar.id)}
                                        className="flex items-center gap-1.5 hover:text-blue-600 transition-colors"
                                    >
                                        <Users className="w-4 h-4 text-blue-600" />
                                        {webinar._count?.registrations || 0} Registrations
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => fetchWebinarDetails(webinar.id)}
                                    className="gap-2 h-10 px-4 border-gray-200"
                                >
                                    Registrants
                                    <ChevronRight className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => {
                                        setSelectedWebinar(webinar);
                                        setIsFormOpen(true);
                                    }}
                                    className="h-10 w-10 text-gray-600 hover:text-blue-600 hover:bg-blue-50 border-gray-200"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() => {
                                        setSelectedWebinar(webinar);
                                        setIsDeleteModalOpen(true);
                                    }}
                                    className="h-10 w-10 text-gray-600 hover:text-red-600 hover:bg-red-50 border-gray-200"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}

                {webinars.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
                        <Loader2 className="w-10 h-10 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">No webinars scheduled yet</h3>
                        <p className="text-gray-500">Get started by creating your first webinar.</p>
                    </div>
                )}
            </div>

            {/* Registrants View Panel */}
            {isRegistrantsVisible && selectedWebinarWithRegistrants && (
                <div className="fixed inset-0 z-[60] flex justify-end">
                    <div 
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
                        onClick={() => setIsRegistrantsVisible(false)}
                    />
                    <div className="relative w-full max-w-3xl bg-gray-50 h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                        <div className="bg-white border-b border-gray-100 p-6 flex items-center justify-between sticky top-0 z-10">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Webinar Registrations</h2>
                                <p className="text-sm text-gray-500">{selectedWebinarWithRegistrants.title}</p>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => setIsRegistrantsVisible(false)}>
                                <ChevronRight className="w-6 h-6" />
                            </Button>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {selectedWebinarWithRegistrants.registrations?.map((reg) => (
                                <div key={reg.id} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4 hover:border-blue-200 transform transition-all group">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-lg">
                                                {reg.firstName[0]}{reg.lastName[0]}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900">{reg.firstName} {reg.lastName}</h4>
                                                <p className="text-sm text-gray-500">{format(new Date(reg.createdAt), 'MMM d, yyyy')}</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="grid md:grid-cols-2 gap-y-3 gap-x-6 pt-2">
                                        <div className="flex items-center gap-2.5 text-sm text-gray-600">
                                            <Mail className="w-4 h-4 text-blue-500" />
                                            {reg.email}
                                        </div>
                                        {reg.phone && (
                                            <div className="flex items-center gap-2.5 text-sm text-gray-600">
                                                <Phone className="w-4 h-4 text-green-500" />
                                                {reg.phone}
                                            </div>
                                        )}
                                        <div className="flex items-center gap-2.5 text-sm text-gray-600">
                                            <Briefcase className="w-4 h-4 text-orange-500" />
                                            {reg.jobTitle || 'N/A'} @ {reg.companyName || 'N/A'}
                                        </div>
                                        <div className="flex items-center gap-2.5 text-sm text-gray-600">
                                            <MapPin className="w-4 h-4 text-red-500" />
                                            {reg.city ? `${reg.city}, ` : ''}{reg.state ? `${reg.state}, ` : ''}{reg.country}
                                        </div>
                                    </div>
                                    
                                    <div className="pt-2">
                                        <span className="px-3 py-1 rounded-lg bg-gray-50 text-gray-600 text-xs font-semibold border border-gray-100 group-hover:bg-blue-50 group-hover:border-blue-100 transition-colors">
                                            Industry: {reg.industry}
                                        </span>
                                    </div>
                                </div>
                            ))}

                            {selectedWebinarWithRegistrants.registrations?.length === 0 && (
                                <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
                                    <p className="text-gray-500">No registrations for this webinar yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <WebinarForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                onSave={fetchWebinars}
                webinar={selectedWebinar}
            />

            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onOpenChange={setIsDeleteModalOpen}
                onConfirm={handleDelete}
                title="Delete Webinar"
                description={`Are you sure you want to delete "${selectedWebinar?.title}"? This will also remove all associated registrations. This action cannot be undone.`}
                itemName={selectedWebinar?.title || 'this webinar'}
            />
        </div>
    );
}
