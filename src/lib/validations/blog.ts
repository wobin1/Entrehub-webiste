import { z } from 'zod';

export const blogPostSchema = z.object({
    title: z.string().min(1, 'Title is required').max(200, 'Title is too long'),
    slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase with hyphens'),
    excerpt: z.string().min(1, 'Excerpt is required').max(500, 'Excerpt is too long'),
    content: z.string().min(1, 'Content is required'),
    coverImage: z.string().url('Cover image must be a valid URL'),
    featured: z.boolean().optional().default(false),
    published: z.boolean().optional().default(false),
    publishedAt: z.string().datetime().optional().nullable(),
    readTime: z.string().min(1, 'Read time is required'),
    authorId: z.string().min(1, 'Author ID is required'),
    categoryId: z.string().min(1, 'Category ID is required'),
    tagIds: z.array(z.string()).optional().default([]),
});

export const updateBlogPostSchema = blogPostSchema.partial();

export const categorySchema = z.object({
    name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
    slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase with hyphens'),
    description: z.string().optional(),
});

export const tagSchema = z.object({
    name: z.string().min(1, 'Name is required').max(50, 'Name is too long'),
    slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase with hyphens'),
});

export const authorSchema = z.object({
    name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
    email: z.string().email('Invalid email address'),
    avatar: z.string().url('Avatar must be a valid URL').optional().or(z.literal('')).nullable(),
    bio: z.string().max(500, 'Bio is too long').optional().or(z.literal('')).nullable(),
});
