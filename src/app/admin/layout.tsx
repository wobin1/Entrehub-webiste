'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import {
    LayoutDashboard,
    FileText,
    MessageSquare,
    Settings,
    LogOut,
    Menu,
    X,
    Info,
    Briefcase,
    Image,
    Users,
    Video,
    ExternalLink,
} from 'lucide-react';
import NextImage from 'next/image';

interface AdminLayoutProps {
    children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check authentication
        const checkAuth = async () => {
            const token = localStorage.getItem('admin_token');

            if (!token) {
                if (pathname !== '/admin/login') {
                    router.push('/admin/login');
                }
                setIsLoading(false);
                return;
            }

            try {
                const res = await fetch('/api/auth/verify', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res.ok) {
                    setIsAuthenticated(true);
                } else {
                    localStorage.removeItem('admin_token');
                    if (pathname !== '/admin/login') {
                        router.push('/admin/login');
                    }
                }
            } catch (_error) {
                localStorage.removeItem('admin_token');
                if (pathname !== '/admin/login') {
                    router.push('/admin/login');
                }
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [pathname, router]);

    useEffect(() => {
        if (!isSidebarOpen) return;
        const onKeyDown = (e: KeyboardEvent) => e.key === 'Escape' && setIsSidebarOpen(false);
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [isSidebarOpen]);

    const handleLogout = () => {
        localStorage.removeItem('admin_token');
        router.push('/admin/login');
    };

    // Don't show layout on login page
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    // Show loading state
    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50" role="status">
                <div className="text-center">
                    <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-navy border-t-transparent" aria-hidden="true" />
                    <p className="text-slate-600">Loading admin panel…</p>
                </div>
            </div>
        );
    }

    // Don't render if not authenticated
    if (!isAuthenticated) {
        return null;
    }

    const navigation = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'Blog Posts', href: '/admin/blog', icon: FileText },
        { name: 'About Section', href: '/admin/about', icon: Info },
        { name: 'Services', href: '/admin/services', icon: Briefcase },
        { name: 'Portfolio', href: '/admin/portfolio', icon: Image },
        { name: 'Team', href: '/admin/team', icon: Users },
        { name: 'Webinar', href: '/admin/webinar', icon: Video },
        { name: 'Messages', href: '/admin/messages', icon: MessageSquare },
        { name: 'Settings', href: '/admin/settings', icon: Settings },
    ];

    const currentPage = navigation.find((item) => pathname === item.href || pathname.startsWith(item.href + '/'));

    return (
        <div className="min-h-screen bg-slate-50">
            <a href="#admin-main" className="skip-link">
                Skip to main content
            </a>

            {/* Mobile sidebar backdrop */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-navy-deep/60 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar */}
            <aside
                id="admin-sidebar"
                aria-label="Admin"
                className={`on-dark fixed left-0 top-0 z-50 h-full w-64 transform bg-navy-deep text-white transition-transform duration-300 lg:translate-x-0 ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex h-full flex-col">
                    <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
                        <Link href="/admin/dashboard" className="flex items-center gap-2.5 rounded-lg">
                            <span className="h-8 w-8 overflow-hidden rounded-lg ring-1 ring-white/20">
                                <NextImage src="/images/logo.jpeg" alt="" width={32} height={32} className="h-full w-full object-cover" />
                            </span>
                            <span className="text-lg font-bold tracking-tight">
                                ENTRE<span className="text-orange-400">HUB</span>
                            </span>
                        </Link>
                        <button
                            type="button"
                            onClick={() => setIsSidebarOpen(false)}
                            aria-label="Close menu"
                            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-slate-300 hover:bg-white/10 hover:text-white lg:hidden"
                        >
                            <X className="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>

                    <nav aria-label="Admin sections" className="flex-1 overflow-y-auto p-3">
                        <ul className="space-y-1">
                            {navigation.map((item) => {
                                const isActive = item === currentPage;
                                return (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            onClick={() => setIsSidebarOpen(false)}
                                            aria-current={isActive ? 'page' : undefined}
                                            className={`flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm transition-colors ${
                                                isActive
                                                    ? 'bg-white/10 font-semibold text-white shadow-[inset_3px_0_0_#fb923c]'
                                                    : 'text-slate-300 hover:bg-white/5 hover:text-white'
                                            }`}
                                        >
                                            <item.icon className="h-5 w-5" aria-hidden="true" />
                                            {item.name}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    <div className="space-y-1 border-t border-white/10 p-3">
                        <a
                            href="/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
                        >
                            <ExternalLink className="h-5 w-5" aria-hidden="true" />
                            View website
                            <span className="sr-only"> (opens in a new tab)</span>
                        </a>
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="flex min-h-11 w-full items-center gap-3 rounded-lg px-3 text-sm text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
                        >
                            <LogOut className="h-5 w-5" aria-hidden="true" />
                            Log out
                        </button>
                    </div>
                </div>
            </aside>

            <div className="lg:ml-64">
                <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
                    <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
                        <button
                            type="button"
                            onClick={() => setIsSidebarOpen(true)}
                            aria-label="Open menu"
                            aria-expanded={isSidebarOpen}
                            aria-controls="admin-sidebar"
                            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 lg:hidden"
                        >
                            <Menu className="h-6 w-6" aria-hidden="true" />
                        </button>
                        <p className="text-sm font-medium text-slate-600">
                            Admin <span aria-hidden="true">/</span>{' '}
                            <span className="text-slate-900">{currentPage?.name ?? 'Panel'}</span>
                        </p>
                    </div>
                </header>

                <main id="admin-main" tabIndex={-1} className="mx-auto max-w-7xl p-4 focus:outline-none sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
