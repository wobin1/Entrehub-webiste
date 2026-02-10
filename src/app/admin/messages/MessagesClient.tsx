'use client';

import { useState, useEffect } from 'react';
import {
    Search,
    Trash2,
    Eye,
    CheckCircle,
    RotateCcw,
    Archive,
    Clock,
    MessageSquare
} from 'lucide-react';
import { format } from 'date-fns';
import { fetchWithAuth } from '@/lib/api/admin';
import { toast } from 'sonner';
import { DeleteConfirmationModal } from '@/components/admin/DeleteConfirmationModal';

interface Message {
    id: string;
    name: string;
    email: string;
    phone?: string;
    message: string;
    status: 'UNREAD' | 'READ' | 'REPLIED' | 'ARCHIVED';
    notes?: string;
    createdAt: string;
}

export default function MessagesClient() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('ALL');
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

    // Delete modal state
    const [deleteModal, setDeleteModal] = useState<{
        isOpen: boolean;
        messageId: string;
        senderName: string;
    }>({
        isOpen: false,
        messageId: '',
        senderName: '',
    });

    useEffect(() => {
        loadMessages();
    }, []);

    const loadMessages = async () => {
        try {
            setIsLoading(true);
            const res = await fetchWithAuth('/api/contact');
            if (!res.ok) throw new Error('Failed to fetch messages');
            const data = await res.json();
            setMessages(data.messages || []);
        } catch (error: any) {
            toast.error(error.message || 'Failed to load messages');
        } finally {
            setIsLoading(false);
        }
    };

    const updateMessageStatus = async (id: string, status: string) => {
        try {
            const res = await fetchWithAuth(`/api/contact/${id}`, {
                method: 'PUT',
                body: JSON.stringify({ status }),
            });
            if (!res.ok) throw new Error('Failed to update message');

            toast.success(`Message marked as ${status.toLowerCase()}`);
            setMessages(prev => prev.map(m => m.id === id ? { ...m, status: status as any } : m));
            if (selectedMessage?.id === id) {
                setSelectedMessage(prev => prev ? { ...prev, status: status as any } : null);
            }
        } catch (error: any) {
            toast.error(error.message || 'Failed to update message');
        }
    };

    const handleDeleteClick = (message: Message) => {
        setDeleteModal({
            isOpen: true,
            messageId: message.id,
            senderName: message.name,
        });
    };

    const confirmDelete = async () => {
        const { messageId } = deleteModal;
        try {
            const res = await fetchWithAuth(`/api/contact/${messageId}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error('Failed to delete message');

            toast.success('Message deleted');
            setMessages(prev => prev.filter(m => m.id !== messageId));
            if (selectedMessage?.id === messageId) setSelectedMessage(null);
        } catch (error: any) {
            toast.error(error.message || 'Failed to delete message');
        }
    };

    const filteredMessages = messages.filter(m => {
        const matchesSearch =
            m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.message.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = statusFilter === 'ALL' || m.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'UNREAD': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'READ': return 'bg-green-100 text-green-700 border-green-200';
            case 'REPLIED': return 'bg-purple-100 text-purple-700 border-purple-200';
            case 'ARCHIVED': return 'bg-gray-100 text-gray-700 border-gray-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search messages..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                    {['ALL', 'UNREAD', 'READ', 'REPLIED', 'ARCHIVED'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${statusFilter === status
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                }`}
                        >
                            {status.charAt(0) + status.slice(1).toLowerCase()}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 bg-gray-50/50">
                        <h2 className="font-semibold text-gray-700 flex items-center gap-2">
                            <MessageSquare className="w-4 h-4" />
                            Inbox ({filteredMessages.length})
                        </h2>
                    </div>
                    <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
                        {isLoading ? (
                            <div className="p-8 text-center">
                                <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                                <p className="text-sm text-gray-500">Loading messages...</p>
                            </div>
                        ) : filteredMessages.length === 0 ? (
                            <div className="p-12 text-center text-gray-500">
                                <Clock className="w-8 h-8 mx-auto mb-2 opacity-20" />
                                <p>No messages found</p>
                            </div>
                        ) : (
                            filteredMessages.map((m) => (
                                <button
                                    key={m.id}
                                    onClick={() => {
                                        setSelectedMessage(m);
                                        if (m.status === 'UNREAD') updateMessageStatus(m.id, 'READ');
                                    }}
                                    className={`w-full text-left p-4 hover:bg-blue-50/50 transition-all relative group ${selectedMessage?.id === m.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <span className={`font-semibold text-sm ${m.status === 'UNREAD' ? 'text-gray-900' : 'text-gray-600'}`}>
                                            {m.name}
                                        </span>
                                        <span className="text-[10px] text-gray-400">
                                            {format(new Date(m.createdAt), 'MMM dd')}
                                        </span>
                                    </div>
                                    <div className="text-xs text-gray-500 truncate mb-2">{m.email}</div>
                                    <p className="text-xs text-gray-600 line-clamp-1 italic">
                                        "{m.message}"
                                    </p>
                                    <div className="mt-2 flex gap-1">
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getStatusColor(m.status)}`}>
                                            {m.status}
                                        </span>
                                    </div>
                                </button>
                            ))
                        )}
                    </div>
                </div>

                <div className="lg:col-span-2">
                    {selectedMessage ? (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col h-full min-h-[500px]">
                            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{selectedMessage.name}</h3>
                                    <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                                        <span>{selectedMessage.email}</span>
                                        {selectedMessage.phone && <span>• {selectedMessage.phone}</span>}
                                        <span>• {format(new Date(selectedMessage.createdAt), 'MMM dd, yyyy HH:mm')}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => updateMessageStatus(selectedMessage.id, selectedMessage.status === 'ARCHIVED' ? 'READ' : 'ARCHIVED')}
                                        className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-all"
                                        title={selectedMessage.status === 'ARCHIVED' ? 'Restore' : 'Archive'}
                                    >
                                        {selectedMessage.status === 'ARCHIVED' ? <RotateCcw className="w-5 h-5" /> : <Archive className="w-5 h-5" />}
                                    </button>
                                    <button
                                        onClick={() => handleDeleteClick(selectedMessage)}
                                        className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-all"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 p-8 space-y-6">
                                <div>
                                    <h4 className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-4">Message Content</h4>
                                    <div className="bg-gray-50 p-6 rounded-2xl text-gray-700 leading-relaxed whitespace-pre-wrap min-h-[200px] border border-gray-100">
                                        {selectedMessage.message}
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => updateMessageStatus(selectedMessage.id, 'REPLIED')}
                                        className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all"
                                    >
                                        <CheckCircle className="w-4 h-4" />
                                        Mark as Replied
                                    </button>
                                    <a
                                        href={`mailto:${selectedMessage.email}?subject=RE: Contact Inquiry from EntreHub`}
                                        className="flex items-center gap-2 px-6 py-2 bg-white text-blue-600 border border-blue-200 rounded-lg font-medium hover:bg-blue-50 transition-all"
                                    >
                                        Reply via Email
                                    </a>
                                </div>
                            </div>

                            <div className="p-4 border-t border-gray-100 bg-gray-50/30 text-center">
                                <span className={`text-xs px-3 py-1 rounded-full border shadow-sm ${getStatusColor(selectedMessage.status)}`}>
                                    Status: <strong>{selectedMessage.status}</strong>
                                </span>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center p-12 h-full min-h-[500px] text-gray-400">
                            <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mb-4">
                                <Eye className="w-10 h-10 opacity-20" />
                            </div>
                            <p className="text-lg font-medium">Select a message to view details</p>
                            <p className="text-sm text-gray-400 mt-1">Read, reply, or archive messages from here</p>
                        </div>
                    )}
                </div>
            </div>

            <DeleteConfirmationModal
                isOpen={deleteModal.isOpen}
                onOpenChange={(open) => setDeleteModal(prev => ({ ...prev, isOpen: open }))}
                onConfirm={confirmDelete}
                title="Delete Message"
                description="Are you sure you want to delete the message from"
                itemName={deleteModal.senderName}
            />
        </div>
    );
}
