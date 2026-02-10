export interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string | null;
    _count?: {
        posts: number;
    };
}

export interface Tag {
    id: string;
    name: string;
    slug: string;
    _count?: {
        posts: number;
    };
}

export interface Author {
    id: string;
    name: string;
    email: string;
    avatar?: string | null;
    bio?: string | null;
    _count?: {
        posts: number;
    };
}

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
    authorId: string;
    categoryId: string;
    tagIds?: string[];
    author?: Author;
    category?: Category;
    tags?: Tag[];
    createdAt: string;
    updatedAt: string;
}
