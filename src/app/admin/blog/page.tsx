'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Search, Pencil, Trash2, Eye, Star, FileText } from 'lucide-react';
import { format } from 'date-fns';
import { getAdminBlogPosts, deleteBlogPost } from '@/lib/api/admin';
import type { BlogPost } from '@/types/admin';

export default function AdminBlogPage() {
    const router = useRouter();
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    useEffect(() => {
        loadPosts();
    }, []);

    const filterPosts = useCallback(() => {
        let filtered = posts;

        // Filter by status
        if (statusFilter === 'published') {
            filtered = filtered.filter((post) => post.published);
        } else if (statusFilter === 'draft') {
            filtered = filtered.filter((post) => !post.published);
        }

        // Filter by search
        if (searchQuery) {
            filtered = filtered.filter(
                (post) =>
                    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredPosts(filtered);
    }, [posts, searchQuery, statusFilter]);

    useEffect(() => {
        filterPosts();
    }, [filterPosts]);

    const loadPosts = async () => {
        try {
            const data = await getAdminBlogPosts();
            setPosts(data.posts || []);
        } catch (error) {
            console.error('Failed to load posts:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (slug: string) => {
        if (deleteConfirm !== slug) {
            setDeleteConfirm(slug);
            setTimeout(() => setDeleteConfirm(null), 3000);
            return;
        }

        try {
            await deleteBlogPost(slug);
            setPosts(posts.filter((p) => p.slug !== slug));
            setDeleteConfirm(null);
        } catch (error: unknown) {
            alert(error instanceof Error ? error.message : 'Failed to delete post');
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-4 border-navy border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Blog Posts</h1>
                    <p className="text-gray-600">
                        {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'}
                    </p>
                </div>
                <button
                    onClick={() => router.push('/admin/blog/new')}
                    className="flex items-center gap-2 px-6 py-3 bg-navy text-white font-semibold rounded-lg hover:bg-navy-hover shadow-sm transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    New Post
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Search */}
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search posts..."
                            aria-label="Search posts"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/30"
                        />
                    </div>

                    {/* Status Filter */}
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value as 'all' | 'published' | 'draft')}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-navy/30"
                    >
                        <option value="all">All Posts</option>
                        <option value="published">Published</option>
                        <option value="draft">Drafts</option>
                    </select>
                </div>
            </div>

            {/* Posts Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Title
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Author
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Category
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Views
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredPosts.map((post) => (
                                <tr key={post.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            {post.featured && (
                                                <span className="text-orange-600" title="Featured">
                                                    <Star className="h-4 w-4 fill-current" aria-hidden="true" />
                                                    <span className="sr-only">Featured</span>
                                                </span>
                                            )}
                                            <div>
                                                <div className="font-medium text-gray-900">{post.title}</div>
                                                <div className="text-sm text-gray-500 truncate max-w-md">
                                                    {post.excerpt}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{post.author?.name || 'Unknown'}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 text-xs font-medium bg-navy-tint text-navy-hover rounded-full">
                                            {post.category?.name || 'Uncategorized'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {post.published ? (
                                            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                                Published
                                            </span>
                                        ) : (
                                            <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                                                Draft
                                            </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{post.views}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        {post.publishedAt
                                            ? format(new Date(post.publishedAt), 'MMM dd, yyyy')
                                            : 'Not published'}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <a
                                                href={`/blog/${post.slug}`}
                                                target="_blank"
                                                className="p-2 text-gray-600 hover:text-navy hover:bg-navy-tint rounded-lg transition-colors"
                                                title="View"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </a>
                                            <button type="button"
                                                onClick={() => router.push(`/admin/blog/${post.id}/edit`)}
                                                className="p-2 text-gray-600 hover:text-navy hover:bg-navy-tint rounded-lg transition-colors"
                                                title="Edit"
 aria-label="Edit">
                                                <Pencil className="w-4 h-4" aria-hidden="true" />
                                            </button>
                                            <button type="button"
                                                onClick={() => handleDelete(post.slug)}
                                                className={`p-2 rounded-lg transition-colors ${deleteConfirm === post.slug
                                                    ? 'text-white bg-red-600 hover:bg-red-700'
                                                    : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                                                    }`}
                                                title={deleteConfirm === post.slug ? 'Click again to confirm' : 'Delete'}
 aria-label="Delete">
                                                <Trash2 className="w-4 h-4" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredPosts.length === 0 && (
                    <div className="text-center py-12">
                        <FileText className="mx-auto mb-4 h-10 w-10 text-gray-500" aria-hidden="true" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
                        <p className="text-gray-600 mb-4">
                            {searchQuery || statusFilter !== 'all'
                                ? 'Try adjusting your filters'
                                : 'Get started by creating your first post'}
                        </p>
                        {!searchQuery && statusFilter === 'all' && (
                            <button
                                onClick={() => router.push('/admin/blog/new')}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-navy text-white font-semibold rounded-lg hover:bg-navy-hover shadow-sm transition-colors"
                            >
                                <Plus className="w-5 h-5" />
                                Create First Post
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
