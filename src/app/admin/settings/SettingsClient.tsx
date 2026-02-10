'use client';

import { useState, useEffect } from 'react';
import {
    Plus,
    Trash2,
    Pencil,
    Save,
    X,
    User,
    Tag as TagIcon,
    Layout,
    Check,
    AlertTriangle
} from 'lucide-react';
import { DeleteConfirmationModal } from '@/components/admin/DeleteConfirmationModal';
import {
    getAdminCategories, createCategory, updateCategory, deleteCategory,
    getAdminTags, createTag, updateTag, deleteTag,
    getAdminAuthors, createAuthor, updateAuthor, deleteAuthor
} from '@/lib/api/admin';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingsClient() {
    const [categories, setCategories] = useState<any[]>([]);
    const [tags, setTags] = useState<any[]>([]);
    const [authors, setAuthors] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('categories');

    // Editing state
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editData, setEditData] = useState<any>({});
    const [isAdding, setIsAdding] = useState<string | null>(null); // 'category', 'tag', 'author'
    const [newData, setNewData] = useState<any>({});

    // Delete confirmation state
    const [deleteModal, setDeleteModal] = useState<{
        isOpen: boolean;
        id: string;
        type: 'category' | 'tag' | 'author';
        name: string;
    }>({
        isOpen: false,
        id: '',
        type: 'category',
        name: '',
    });

    useEffect(() => {
        loadAll();
    }, []);

    const loadAll = async () => {
        try {
            setIsLoading(true);
            const [cats, tgs, auths] = await Promise.all([
                getAdminCategories(),
                getAdminTags(),
                getAdminAuthors()
            ]);
            setCategories(cats.categories || []);
            setTags(tgs.tags || []);
            setAuthors(auths.authors || []);
        } catch (error: any) {
            toast.error('Failed to load settings data');
        } finally {
            setIsLoading(false);
        }
    };

    const startEdit = (item: any) => {
        setEditingId(item.id);
        setEditData(item);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditData({});
    };

    const handleSaveEdit = async (type: 'category' | 'tag' | 'author') => {
        try {
            if (type === 'category') {
                const res = await updateCategory(editingId!, editData);
                setCategories(prev => prev.map(c => c.id === editingId ? res.category : c));
            } else if (type === 'tag') {
                const res = await updateTag(editingId!, editData);
                setTags(prev => prev.map(t => t.id === editingId ? res.tag : t));
            } else if (type === 'author') {
                const res = await updateAuthor(editingId!, editData);
                setAuthors(prev => prev.map(a => a.id === editingId ? res.author : a));
            }
            toast.success(`${type} updated successfully`);
            cancelEdit();
        } catch (error: any) {
            toast.error(`Failed to update ${type}`);
        }
    };

    const handleCreate = async (type: 'category' | 'tag' | 'author') => {
        try {
            // Clean data: remove empty strings for optional fields
            const dataToSubmit = { ...newData };
            if (type === 'author') {
                if (!dataToSubmit.avatar) delete dataToSubmit.avatar;
                if (!dataToSubmit.bio) delete dataToSubmit.bio;
            }

            if (type === 'category') {
                const res = await createCategory(dataToSubmit);
                setCategories(prev => [...prev, res.category]);
            } else if (type === 'tag') {
                const res = await createTag(dataToSubmit);
                setTags(prev => [...prev, res.tag]);
            } else if (type === 'author') {
                const res = await createAuthor(dataToSubmit);
                setAuthors(prev => [...prev, res.author]);
            }
            toast.success(`${type} created successfully`);
            setIsAdding(null);
            setNewData({});
        } catch (error: any) {
            toast.error(error.message || `Failed to create ${type}`);
        }
    };

    const handleDeleteClick = (id: string, name: string, type: 'category' | 'tag' | 'author') => {
        console.log('handleDeleteClick triggered:', { id, name, type });
        setDeleteModal({
            isOpen: true,
            id,
            name,
            type,
        });
    };

    const confirmDelete = async () => {
        const { id, type } = deleteModal;
        console.log(`Attempting to delete ${type} with id: ${id}`);
        try {
            if (type === 'category') {
                await deleteCategory(id);
                setCategories(prev => prev.filter(c => c.id !== id));
            } else if (type === 'tag') {
                await deleteTag(id);
                setTags(prev => prev.filter(t => t.id !== id));
            } else if (type === 'author') {
                await deleteAuthor(id);
                setAuthors(prev => prev.filter(a => a.id !== id));
            }
            toast.success(`${type} deleted`);
            console.log(`${type} deleted successfully`);
        } catch (error: any) {
            console.error(`Delete failed for ${type}:`, error);
            toast.error(error.message || `Failed to delete ${type}`);
        } finally {
            setDeleteModal(prev => ({ ...prev, isOpen: false }));
        }
    };

    const renderTable = (items: any[], type: 'category' | 'tag' | 'author') => {
        const isEditing = (id: string) => editingId === id;

        return (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left font-semibold text-gray-600">Name / Detail</th>
                            {type === 'author' && <th className="px-6 py-3 text-left font-semibold text-gray-600">Email</th>}
                            <th className="px-6 py-3 text-center font-semibold text-gray-600">Posts</th>
                            <th className="px-6 py-3 text-right font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {/* Adding row */}
                        {isAdding === type && (
                            <tr className="bg-blue-50/30">
                                <td className="px-6 py-4">
                                    <div className="space-y-2">
                                        <input
                                            type="text"
                                            placeholder="Name"
                                            autoFocus
                                            className="w-full px-3 py-1.5 rounded-lg border border-gray-200"
                                            value={newData.name || ''}
                                            onChange={e => {
                                                const val = e.target.value;
                                                const slug = val.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
                                                setNewData({ ...newData, name: val, slug });
                                            }}
                                        />
                                        {type !== 'author' && (
                                            <input
                                                type="text"
                                                placeholder="Slug"
                                                className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-mono"
                                                value={newData.slug || ''}
                                                onChange={e => setNewData({ ...newData, slug: e.target.value })}
                                            />
                                        )}
                                        {type === 'author' && (
                                            <input
                                                type="text"
                                                placeholder="Avatar URL"
                                                className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-xs"
                                                value={newData.avatar || ''}
                                                onChange={e => setNewData({ ...newData, avatar: e.target.value })}
                                            />
                                        )}
                                    </div>
                                </td>
                                {type === 'author' && (
                                    <td className="px-6 py-4">
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            className="w-full px-3 py-1.5 rounded-lg border border-gray-200"
                                            value={newData.email || ''}
                                            onChange={e => setNewData({ ...newData, email: e.target.value })}
                                        />
                                    </td>
                                )}
                                <td className="px-6 py-4 text-center text-gray-400">-</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button onClick={() => handleCreate(type)} className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                            <Check className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => setIsAdding(null)} className="p-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300">
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )}

                        {items.map(item => (
                            <tr key={item.id} className="group hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    {isEditing(item.id) ? (
                                        <div className="space-y-2">
                                            <input
                                                type="text"
                                                className="w-full px-3 py-1.5 rounded-lg border border-blue-200"
                                                value={editData.name || ''}
                                                onChange={e => setEditData({ ...editData, name: e.target.value })}
                                            />
                                            {type !== 'author' && (
                                                <input
                                                    type="text"
                                                    className="w-full px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-mono"
                                                    value={editData.slug || ''}
                                                    onChange={e => setEditData({ ...editData, slug: e.target.value })}
                                                />
                                            )}
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-3">
                                            {type === 'author' && (
                                                <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
                                                    {item.avatar ? <img src={item.avatar} alt="" className="w-full h-full object-cover" /> : <User className="w-4 h-4 m-2 text-gray-400" />}
                                                </div>
                                            )}
                                            <div>
                                                <div className="font-medium text-gray-900">{item.name}</div>
                                                {type !== 'author' && <div className="text-xs text-gray-400 font-mono">{item.slug}</div>}
                                            </div>
                                        </div>
                                    )}
                                </td>
                                {type === 'author' && (
                                    <td className="px-6 py-4">
                                        {isEditing(item.id) ? (
                                            <input
                                                type="email"
                                                className="w-full px-3 py-1.5 rounded-lg border border-blue-200"
                                                value={editData.email || ''}
                                                onChange={e => setEditData({ ...editData, email: e.target.value })}
                                            />
                                        ) : (
                                            <span className="text-gray-500">{item.email}</span>
                                        )}
                                    </td>
                                )}
                                <td className="px-6 py-4 text-center">
                                    <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-bold">
                                        {item._count?.posts || 0}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {isEditing(item.id) ? (
                                            <>
                                                <button onClick={() => handleSaveEdit(type)} className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                                                    <Save className="w-4 h-4" />
                                                </button>
                                                <button onClick={cancelEdit} className="p-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300">
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button onClick={() => startEdit(item)} className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors">
                                                    <Pencil className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDeleteClick(item.id, item.name, type);
                                                    }}
                                                    className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors disabled:opacity-20 disabled:cursor-not-allowed"
                                                    disabled={item._count?.posts > 0}
                                                    title={item._count?.posts > 0 ? "Cannot delete item with linked posts" : "Delete"}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    if (isLoading && !categories.length) {
        return (
            <div className="p-12 text-center text-gray-500 animate-pulse">
                <Layout className="w-8 h-8 mx-auto mb-4 opacity-20" />
                <p>Loading your settings...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <Tabs value={activeTab} onValueChange={(val) => {
                console.log('Tab changed to:', val);
                setActiveTab(val);
            }} className="w-full">
                <div className="flex justify-between items-center mb-6">
                    <TabsList className="bg-white border border-gray-100 p-1">
                        <TabsTrigger value="categories" className="flex items-center gap-2">
                            <Layout className="w-4 h-4" />
                            Categories
                        </TabsTrigger>
                        <TabsTrigger value="tags" className="flex items-center gap-2">
                            <TagIcon className="w-4 h-4" />
                            Tags
                        </TabsTrigger>
                        <TabsTrigger value="authors" className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            Authors
                        </TabsTrigger>
                    </TabsList>

                    <button
                        onClick={() => {
                            console.log('Add New button clicked. activeTab:', activeTab);
                            // Map plural to singular
                            const type = activeTab === 'categories' ? 'category' :
                                activeTab === 'tags' ? 'tag' :
                                    activeTab === 'authors' ? 'author' : null;

                            console.log('Mapped type:', type);
                            if (type) {
                                setIsAdding(type);
                                setNewData({});
                            } else {
                                console.warn('Could not determine entity type for activeTab:', activeTab);
                            }
                        }}
                        className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-orange-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                    >
                        <Plus className="w-4 h-4" />
                        Add New
                    </button>
                </div>

                <TabsContent value="categories" className="mt-0 space-y-4">
                    <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 text-sm text-blue-700">
                        <strong>Categories</strong> help you organize your posts into high-level topics.
                    </div>
                    {renderTable(categories, 'category')}
                </TabsContent>

                <TabsContent value="tags" className="mt-0 space-y-4">
                    <div className="p-4 bg-orange-50/50 rounded-xl border border-orange-100 text-sm text-orange-700">
                        <strong>Tags</strong> are specific keywords used to describe post details.
                    </div>
                    {renderTable(tags, 'tag')}
                </TabsContent>

                <TabsContent value="authors" className="mt-0 space-y-4">
                    <div className="p-4 bg-purple-50/50 rounded-xl border border-purple-100 text-sm text-purple-700">
                        <strong>Authors</strong> are the individuals who write content for your blog.
                    </div>
                    {renderTable(authors, 'author')}
                </TabsContent>
            </Tabs>

            <DeleteConfirmationModal
                isOpen={deleteModal.isOpen}
                onOpenChange={(open) => {
                    console.log('Modal onOpenChange:', open);
                    setDeleteModal(prev => ({ ...prev, isOpen: open }));
                }}
                onConfirm={confirmDelete}
                title={`Delete ${deleteModal.type ? deleteModal.type.charAt(0).toUpperCase() + deleteModal.type.slice(1) : 'Item'}`}
                description={`Are you sure you want to delete this ${deleteModal.type || 'item'}`}
                itemName={deleteModal.name}
            />
        </div>
    );
}
