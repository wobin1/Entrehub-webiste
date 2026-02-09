'use client';

import { useRouter } from 'next/navigation';
import BlogForm from '@/components/admin/BlogForm';
import { createBlogPost } from '@/lib/api/admin';

export default function NewBlogPostPage() {
    const router = useRouter();

    const handleSubmit = async (data: any) => {
        try {
            await createBlogPost(data);
            router.push('/admin/blog');
        } catch (error) {
            throw error;
        }
    };

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Post</h1>
                <p className="text-gray-600">Fill in the details to create a new blog post.</p>
            </div>

            <BlogForm onSubmit={handleSubmit} />
        </div>
    );
}
