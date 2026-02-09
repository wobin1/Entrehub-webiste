'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import {
    getAdminCategories,
    getAdminTags,
    getAdminAuthors
} from '@/lib/api/admin';
import RichTextEditor from '@/components/admin/RichTextEditor';

interface BlogFormProps {
    initialData?: any;
    isEdit?: boolean;
    onSubmit: (data: any) => Promise<void>;
}

export default function BlogForm({ initialData, isEdit = false, onSubmit }: BlogFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState<any[]>([]);
    const [tags, setTags] = useState<any[]>([]);
    const [authors, setAuthors] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        slug: initialData?.slug || '',
        excerpt: initialData?.excerpt || '',
        content: initialData?.content || '',
        coverImage: initialData?.coverImage || '',
        categoryId: initialData?.categoryId || '',
        authorId: initialData?.authorId || '',
        tagIds: initialData?.tags?.map((t: any) => t.id) || [],
        featured: initialData?.featured || false,
        published: initialData?.published || false,
        readTime: initialData?.readTime || '5 min read',
    });

    useEffect(() => {
        loadFormData();
    }, []);

    useEffect(() => {
        // Auto-generate slug from title
        if (!isEdit && formData.title) {
            const slug = formData.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            setFormData((prev) => ({ ...prev, slug }));
        }
    }, [formData.title, isEdit]);

    const loadFormData = async () => {
        try {
            const [categoriesData, tagsData, authorsData] = await Promise.all([
                getAdminCategories(),
                getAdminTags(),
                getAdminAuthors(),
            ]);
            setCategories(categoriesData.categories || []);
            setTags(tagsData.tags || []);
            setAuthors(authorsData.authors || []);
        } catch (error) {
            console.error('Failed to load form data:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            await onSubmit(formData);
        } catch (error: any) {
            alert(error.message || 'Failed to save post');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;

        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleTagToggle = (tagId: string) => {
        setFormData((prev) => ({
            ...prev,
            tagIds: prev.tagIds.includes(tagId)
                ? prev.tagIds.filter((id) => id !== tagId)
                : [...prev.tagIds, tagId],
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back
                </button>
                <div className="flex items-center gap-3">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-orange-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                <Save className="w-5 h-5" />
                                {isEdit ? 'Update Post' : 'Create Post'}
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Main Form */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Left Column - Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Title */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Title *
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 text-lg font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter post title..."
                        />
                    </div>

                    {/* Slug */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Slug *
                        </label>
                        <input
                            type="text"
                            name="slug"
                            value={formData.slug}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                            placeholder="post-slug"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            URL: /blog/{formData.slug || 'post-slug'}
                        </p>
                    </div>

                    {/* Excerpt */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Excerpt *
                        </label>
                        <textarea
                            name="excerpt"
                            value={formData.excerpt}
                            onChange={handleChange}
                            required
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            placeholder="Brief description of the post..."
                        />
                    </div>

                    {/* Content */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Content *
                        </label>
                        <RichTextEditor
                            content={formData.content}
                            onChange={(content) => setFormData((prev) => ({ ...prev, content }))}
                            placeholder="Write your blog post content here..."
                        />
                        <p className="text-xs text-gray-500 mt-2">
                            💡 Tip: Use the toolbar for formatting. Changes are automatically saved as HTML.
                        </p>
                    </div>
                </div>

                {/* Right Column - Metadata */}
                <div className="space-y-6">
                    {/* Publish Settings */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <h3 className="font-semibold text-gray-900 mb-4">Publish Settings</h3>
                        <div className="space-y-4">
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="published"
                                    checked={formData.published}
                                    onChange={handleChange}
                                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                                />
                                <span className="text-sm font-medium text-gray-700">Published</span>
                            </label>
                            <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="featured"
                                    checked={formData.featured}
                                    onChange={handleChange}
                                    className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                                />
                                <span className="text-sm font-medium text-gray-700">Featured Post</span>
                            </label>
                        </div>
                    </div>

                    {/* Cover Image */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Cover Image URL *
                        </label>
                        <input
                            type="url"
                            name="coverImage"
                            value={formData.coverImage}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            placeholder="https://example.com/image.jpg"
                        />
                        {formData.coverImage && (
                            <div className="mt-3 rounded-lg overflow-hidden border border-gray-200">
                                <img
                                    src={formData.coverImage}
                                    alt="Cover preview"
                                    className="w-full h-32 object-cover"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src =
                                            'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200"%3E%3Crect fill="%23ddd" width="400" height="200"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EInvalid Image%3C/text%3E%3C/svg%3E';
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Category */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Category *
                        </label>
                        <select
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select category</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Author */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Author *
                        </label>
                        <select
                            name="authorId"
                            value={formData.authorId}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select author</option>
                            {authors.map((author) => (
                                <option key={author.id} value={author.id}>
                                    {author.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Tags */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <label className="block text-sm font-medium text-gray-700 mb-3">Tags</label>
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <button
                                    key={tag.id}
                                    type="button"
                                    onClick={() => handleTagToggle(tag.id)}
                                    className={`px-3 py-1.5 text-sm rounded-full transition-colors ${formData.tagIds.includes(tag.id)
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {tag.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Read Time */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Read Time
                        </label>
                        <input
                            type="text"
                            name="readTime"
                            value={formData.readTime}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="5 min read"
                        />
                    </div>
                </div>
            </div>
        </form>
    );
}
