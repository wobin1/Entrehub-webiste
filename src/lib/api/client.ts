// API client utilities for frontend

const API_BASE_URL = process.env.NEXT_PUBLIC_APP_URL || '';

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage: string;
    featured: boolean;
    published: boolean;
    publishedAt: string | null;
    readTime: string;
    views: number;
    author: {
        id: string;
        name: string;
        avatar: string | null;
        bio: string | null;
    };
    category: {
        id: string;
        name: string;
        slug: string;
    };
    tags: Array<{
        id: string;
        name: string;
        slug: string;
    }>;
    createdAt: string;
    updatedAt: string;
}

export interface PaginatedResponse<T> {
    posts?: T[];
    categories?: T[];
    tags?: T[];
    authors?: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

/**
 * Fetch blog posts with optional filtering
 */
export async function getBlogPosts(params?: {
    page?: number;
    limit?: number;
    category?: string;
    search?: string;
    featured?: boolean;
}): Promise<PaginatedResponse<BlogPost>> {
    const searchParams = new URLSearchParams();

    if (params?.page) searchParams.set('page', params.page.toString());
    if (params?.limit) searchParams.set('limit', params.limit.toString());
    if (params?.category) searchParams.set('category', params.category);
    if (params?.search) searchParams.set('search', params.search);
    if (params?.featured !== undefined) searchParams.set('featured', params.featured.toString());

    const url = `${API_BASE_URL}/api/blog${searchParams.toString() ? `?${searchParams}` : ''}`;

    const res = await fetch(url, {
        cache: 'no-store', // Always fetch fresh data
    });

    if (!res.ok) {
        throw new Error('Failed to fetch blog posts');
    }

    return res.json();
}

/**
 * Fetch a single blog post by slug
 */
export async function getBlogPost(slug: string): Promise<{ post: BlogPost }> {
    const res = await fetch(`${API_BASE_URL}/api/blog/${slug}`, {
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error('Failed to fetch blog post');
    }

    return res.json();
}

/**
 * Fetch all categories
 */
export async function getCategories() {
    const res = await fetch(`${API_BASE_URL}/api/blog/categories`, {
        next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!res.ok) {
        throw new Error('Failed to fetch categories');
    }

    return res.json();
}

/**
 * Fetch all tags
 */
export async function getTags() {
    const res = await fetch(`${API_BASE_URL}/api/blog/tags`, {
        next: { revalidate: 3600 },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch tags');
    }

    return res.json();
}

/**
 * Submit contact form
 */
export async function submitContactForm(data: {
    name: string;
    email: string;
    phone?: string;
    message: string;
}) {
    const res = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to submit message');
    }

    return res.json();
}
