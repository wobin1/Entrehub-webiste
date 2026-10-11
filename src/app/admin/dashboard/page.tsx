import { FileText, MessageSquare, Users, Eye, Settings, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default async function AdminDashboard() {
    // In a real implementation, fetch these stats from the API
    const stats = [
        { name: 'Total Blog Posts', value: '6', icon: FileText, change: '+2 this week' },
        { name: 'Contact Messages', value: '0', icon: MessageSquare, change: 'All caught up' },
        { name: 'Total Views', value: '0', icon: Eye, change: 'Start tracking' },
        { name: 'Authors', value: '6', icon: Users, change: 'Active writers' },
    ];

    const actions = [
        { name: 'Create new post', description: 'Write and publish an article', href: '/admin/blog/new', icon: FileText },
        { name: 'View messages', description: 'Reply to contact enquiries', href: '/admin/messages', icon: MessageSquare },
        { name: 'Manage settings', description: 'Site details and preferences', href: '/admin/settings', icon: Settings },
    ];

    return (
        <div>
            <div className="mb-8">
                <h1 className="mb-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Dashboard</h1>
                <p className="text-slate-600">Welcome back! Here&apos;s what&apos;s happening with your website.</p>
            </div>

            <dl className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                    <div key={stat.name} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <div className="mb-4 flex items-center justify-between">
                            <dt className="text-sm font-medium text-slate-600">{stat.name}</dt>
                            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-navy-tint text-navy" aria-hidden="true">
                                <stat.icon className="h-5 w-5" />
                            </span>
                        </div>
                        <dd>
                            <span className="block text-3xl font-bold text-slate-900">{stat.value}</span>
                            <span className="mt-1 block text-xs text-slate-600">{stat.change}</span>
                        </dd>
                    </div>
                ))}
            </dl>

            <section aria-labelledby="quick-actions" className="mb-8 rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <h2 id="quick-actions" className="mb-4 text-lg font-semibold text-slate-900">Quick actions</h2>
                <ul className="grid grid-cols-1 gap-3 md:grid-cols-3">
                    {actions.map((action) => (
                        <li key={action.href}>
                            <Link
                                href={action.href}
                                className="group flex items-center gap-4 rounded-lg border border-slate-200 p-4 transition-colors hover:border-navy/30 hover:bg-navy-tint/50"
                            >
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy-tint text-navy" aria-hidden="true">
                                    <action.icon className="h-5 w-5" />
                                </span>
                                <span className="min-w-0 flex-1">
                                    <span className="block font-medium text-slate-900">{action.name}</span>
                                    <span className="block text-sm text-slate-600">{action.description}</span>
                                </span>
                                <ArrowRight className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-0.5 group-hover:text-navy" aria-hidden="true" />
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>

            <section aria-labelledby="welcome" className="on-dark rounded-xl bg-navy-deep p-6 text-white sm:p-8">
                <h2 id="welcome" className="mb-2 text-xl font-bold sm:text-2xl">Welcome to the ENTREHUB CMS</h2>
                <p className="mb-6 max-w-2xl text-slate-300">
                    Your blog CMS is ready to use. Start by creating your first blog post or managing your content.
                </p>
                <div className="flex flex-wrap gap-3">
                    <Link
                        href="/admin/blog"
                        className="inline-flex min-h-11 items-center rounded-lg bg-white px-5 font-semibold text-navy transition-colors hover:bg-navy-tint"
                    >
                        Manage blog
                    </Link>
                    <a
                        href="/blog"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/30 px-5 font-semibold text-white transition-colors hover:bg-white/10"
                    >
                        View public blog
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                        <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                </div>
            </section>
        </div>
    );
}
