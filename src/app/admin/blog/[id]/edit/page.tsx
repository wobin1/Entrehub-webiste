'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import BlogForm from '@/components/admin/BlogForm';
import { getAdminBlogPosts, updateBlogPost } from '@/lib/api/admin';

export default function EditBlogPostPage() {
    const router = useRouter();
    const params = useParams();
    const [post, setPost] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadPost();
    }, []);

    const loadPost = async () => {
        try {
            const data = await getAdminBlogPosts();
            const foundPost = data.posts?.find((p: any) => p.id === params.id);

            if (!foundPost) {
                alert('Post not found');
                router.push('/admin/blog');
                return;
            }

            setPost(foundPost);
        } catch (error) {
            console.error('Failed to load post:', error);
            alert('Failed to load post');
            router.push('/admin/blog');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (data: any) => {
        try {
            await updateBlogPost(post.slug, data);
            router.push('/admin/blog');
        } catch (error) {
            throw error;
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!post) {
        return null;
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Post</h1>
                <p className="text-gray-600">Update the details of your blog post.</p>
            </div>

            <BlogForm initialData={post} isEdit onSubmit={handleSubmit} />
        </div>
    );
}
