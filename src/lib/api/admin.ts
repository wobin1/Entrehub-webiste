import { BlogPost, Category, Tag, Author } from '@/types/admin';

// Admin API client utilities with authentication

export async function getAuthToken(): Promise<string | null> {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('admin_token');
}

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
    const token = await getAuthToken();

    if (!token) {
        throw new Error('Not authenticated');
    }

    const headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    try {
        const response = await fetch(url, {
            ...options,
            headers,
        });

        if (response.status === 401) {
            // Token expired or invalid
            localStorage.removeItem('admin_token');
            if (typeof window !== 'undefined') {
                window.location.href = '/admin/login';
            }
            throw new Error('Authentication expired');
        }

        // Check if the response is actually JSON before parsing
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const text = await response.text();
            console.error(`Expected JSON but received ${contentType} from ${url}`, text.substring(0, 200));
            throw new Error(`Unexpected response from server: ${response.status} ${response.statusText}`);
        }

        return response;
    } catch (error) {
        console.error(`Fetch error for ${url}:`, error);
        throw error;
    }
}

// Blog Posts
export async function getAdminBlogPosts(): Promise<{ posts: BlogPost[] }> {
    const response = await fetchWithAuth('/api/blog?limit=1000');
    if (!response.ok) throw new Error('Failed to fetch blog posts');
    return response.json();
}

export async function createBlogPost(data: Partial<BlogPost>): Promise<{ post: BlogPost }> {
    const response = await fetchWithAuth('/api/blog', {
        method: 'POST',
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create blog post');
    }
    return response.json();
}

export async function updateBlogPost(slug: string, data: Partial<BlogPost>): Promise<{ post: BlogPost }> {
    const response = await fetchWithAuth(`/api/blog/${slug}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update blog post');
    }
    return response.json();
}

export async function deleteBlogPost(slug: string): Promise<{ message: string }> {
    const response = await fetchWithAuth(`/api/blog/${slug}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete blog post');
    }
    return response.json();
}

// Categories
export async function getAdminCategories(): Promise<{ categories: Category[] }> {
    const response = await fetch('/api/blog/categories');

    if (!response.ok) {
        const text = await response.text();
        console.error('Failed to fetch categories:', response.status, text.substring(0, 200));
        throw new Error('Failed to fetch categories');
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Expected JSON categories but received:', contentType, text.substring(0, 200));
        throw new Error('Unexpected response format from categories API');
    }

    return response.json();
}

export async function createCategory(data: Partial<Category>): Promise<{ category: Category }> {
    const response = await fetchWithAuth('/api/blog/categories', {
        method: 'POST',
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create category');
    }
    return response.json();
}

export async function updateCategory(id: string, data: Partial<Category>): Promise<{ category: Category }> {
    const response = await fetchWithAuth(`/api/blog/categories/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update category');
    }
    return response.json();
}

export async function deleteCategory(id: string): Promise<{ message: string }> {
    const response = await fetchWithAuth(`/api/blog/categories/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete category');
    }
    return response.json();
}

// Tags
export async function getAdminTags(): Promise<{ tags: Tag[] }> {
    const response = await fetch('/api/blog/tags');

    if (!response.ok) {
        const text = await response.text();
        console.error('Failed to fetch tags:', response.status, text.substring(0, 200));
        throw new Error('Failed to fetch tags');
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Expected JSON tags but received:', contentType, text.substring(0, 200));
        throw new Error('Unexpected response format from tags API');
    }

    return response.json();
}

export async function createTag(data: Partial<Tag>): Promise<{ tag: Tag }> {
    const response = await fetchWithAuth('/api/blog/tags', {
        method: 'POST',
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create tag');
    }
    return response.json();
}

export async function updateTag(id: string, data: Partial<Tag>): Promise<{ tag: Tag }> {
    const response = await fetchWithAuth(`/api/blog/tags/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update tag');
    }
    return response.json();
}

export async function deleteTag(id: string): Promise<{ message: string }> {
    const response = await fetchWithAuth(`/api/blog/tags/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete tag');
    }
    return response.json();
}

// Authors
export async function getAdminAuthors(): Promise<{ authors: Author[] }> {
    const response = await fetch('/api/blog/authors');

    if (!response.ok) {
        const text = await response.text();
        console.error('Failed to fetch authors:', response.status, text.substring(0, 200));
        throw new Error('Failed to fetch authors');
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Expected JSON authors but received:', contentType, text.substring(0, 200));
        throw new Error('Unexpected response format from authors API');
    }

    return response.json();
}

export async function createAuthor(data: Partial<Author>): Promise<{ author: Author }> {
    const response = await fetchWithAuth('/api/blog/authors', {
        method: 'POST',
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create author');
    }
    return response.json();
}

export async function updateAuthor(id: string, data: Partial<Author>): Promise<{ author: Author }> {
    const response = await fetchWithAuth(`/api/blog/authors/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update author');
    }
    return response.json();
}

export async function deleteAuthor(id: string): Promise<{ message: string }> {
    const response = await fetchWithAuth(`/api/blog/authors/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete author');
    }
    return response.json();
}
