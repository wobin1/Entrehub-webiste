'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Briefcase, Plus, Pencil, Trash2, Loader2, GripVertical } from 'lucide-react';
import ServiceDialog from '@/components/admin/service-dialog';
import { DeleteConfirmationModal } from '@/components/admin/DeleteConfirmationModal';

interface Service {
    id: string;
    title: string;
    description: string;
    icon: string;
    included: string;
    order: number;
}

export default function ServicesAdminPage() {
    const [services, setServices] = useState<Service[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedService, setSelectedService] = useState<Service | null>(null);

    // Delete modal state
    const [deleteModal, setDeleteModal] = useState<{
        isOpen: boolean;
        serviceId: string;
        serviceTitle: string;
    }>({
        isOpen: false,
        serviceId: '',
        serviceTitle: '',
    });

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const res = await fetch('/api/services');
            if (res.ok) {
                const data = await res.json();
                setServices(data);
            }
        } catch (_error) {
            toast.error('Failed to fetch services');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (service: Service) => {
        setSelectedService(service);
        setIsDialogOpen(true);
    };

    const handleDeleteClick = (service: Service) => {
        setDeleteModal({
            isOpen: true,
            serviceId: service.id,
            serviceTitle: service.title,
        });
    };

    const confirmDelete = async () => {
        const { serviceId } = deleteModal;
        try {
            const res = await fetch(`/api/services/${serviceId}`, { method: 'DELETE' });
            if (res.ok) {
                toast.success('Service deleted');
                fetchServices();
            } else {
                toast.error('Failed to delete service');
            }
        } catch (_error) {
            toast.error('An error occurred');
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-navy" />
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-navy-tint rounded-xl">
                        <Briefcase className="w-6 h-6 text-navy" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Services</h1>
                        <p className="text-gray-500 text-sm">Manage what you offer to clients</p>
                    </div>
                </div>

                <button
                    onClick={() => {
                        setSelectedService(null);
                        setIsDialogOpen(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-navy text-white rounded-lg hover:bg-navy-hover transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Service
                </button>
            </div>

            <div className="grid gap-4">
                {services.map((service) => (
                    <div
                        key={service.id}
                        className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between group hover:border-navy/25 transition-colors"
                    >
                        <div className="flex items-center gap-4">
                            <div className="text-gray-500">
                                <GripVertical className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">{service.title}</h3>
                                <p className="text-sm text-gray-500 line-clamp-1">{service.description}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button type="button"
                                onClick={() => handleEdit(service)}
                                className="p-2 text-gray-500 hover:text-navy hover:bg-navy-tint rounded-lg transition-colors"
 aria-label="Edit">
                                <Pencil className="w-5 h-5" aria-hidden="true" />
                            </button>
                            <button type="button"
                                onClick={() => handleDeleteClick(service)}
                                className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
 aria-label="Delete">
                                <Trash2 className="w-5 h-5" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <ServiceDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onSave={fetchServices}
                service={selectedService}
            />

            <DeleteConfirmationModal
                isOpen={deleteModal.isOpen}
                onOpenChange={(open) => setDeleteModal(prev => ({ ...prev, isOpen: open }))}
                onConfirm={confirmDelete}
                title="Delete Service"
                description="Are you sure you want to delete the service"
                itemName={deleteModal.serviceTitle}
            />
        </div>
    );
}
