'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Users, Plus, Pencil, Trash2, Loader2, GripVertical } from 'lucide-react';
import TeamDialog from '@/components/admin/team-dialog';
import { DeleteConfirmationModal } from '@/components/admin/DeleteConfirmationModal';

interface TeamMember {
    id: string;
    name: string;
    role: string;
    image: string;
    order: number;
}

export default function TeamAdminPage() {
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

    // Delete modal state
    const [deleteModal, setDeleteModal] = useState<{
        isOpen: boolean;
        memberId: string;
        memberName: string;
    }>({
        isOpen: false,
        memberId: '',
        memberName: '',
    });

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const res = await fetch('/api/team');
            if (res.ok) {
                const data = await res.json();
                setMembers(data);
            }
        } catch (error) {
            toast.error('Failed to fetch team members');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (member: TeamMember) => {
        setSelectedMember(member);
        setIsDialogOpen(true);
    };

    const handleDeleteClick = (member: TeamMember) => {
        setDeleteModal({
            isOpen: true,
            memberId: member.id,
            memberName: member.name,
        });
    };

    const confirmDelete = async () => {
        const { memberId } = deleteModal;
        try {
            const res = await fetch(`/api/team/${memberId}`, { method: 'DELETE' });
            if (res.ok) {
                toast.success('Member deleted');
                fetchMembers();
            } else {
                toast.error('Failed to delete member');
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
                        <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Team Members</h1>
                        <p className="text-gray-500 text-sm">Manage your experts</p>
                    </div>
                </div>

                <button
                    onClick={() => {
                        setSelectedMember(null);
                        setIsDialogOpen(true);
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Member
                </button>
            </div>

            <div className="grid gap-4">
                {members.map((member) => (
                    <div
                        key={member.id}
                        className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex items-center justify-between group hover:border-blue-300 transition-colors"
                    >
                        <div className="flex items-center gap-4">
                            <div className="text-gray-400">
                                <GripVertical className="w-5 h-5" />
                            </div>
                            <div className="w-12 h-12 bg-gray-100 rounded-full overflow-hidden relative">
                                <img src={member.image} alt={member.name} className="object-cover w-full h-full" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">{member.name}</h3>
                                <p className="text-sm text-gray-500">{member.role}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => handleEdit(member)}
                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                                <Pencil className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => handleDeleteClick(member)}
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <TeamDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onSave={fetchMembers}
                member={selectedMember}
            />

            <DeleteConfirmationModal
                isOpen={deleteModal.isOpen}
                onOpenChange={(open) => setDeleteModal(prev => ({ ...prev, isOpen: open }))}
                onConfirm={confirmDelete}
                title="Delete Member"
                description="Are you sure you want to delete the member"
                itemName={deleteModal.memberName}
            />
        </div>
    );
}
