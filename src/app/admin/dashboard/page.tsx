import { FileText, MessageSquare, Users, Eye } from 'lucide-react';

export default async function AdminDashboard() {
    // In a real implementation, fetch these stats from the API
    const stats = [
        {
            name: 'Total Blog Posts',
            value: '6',
            icon: FileText,
            color: 'bg-blue-500',
            change: '+2 this week',
        },
        {
            name: 'Contact Messages',
            value: '0',
            icon: MessageSquare,
            color: 'bg-orange-500',
            change: 'All caught up',
        },
        {
            name: 'Total Views',
            value: '0',
            icon: Eye,
            color: 'bg-green-500',
            change: 'Start tracking',
        },
        {
            name: 'Authors',
            value: '6',
            icon: Users,
            color: 'bg-purple-500',
            change: 'Active writers',
        },
    ];

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
                <p className="text-gray-600">Welcome back! Here's what's happening with your CMS.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => (
                    <div
                        key={stat.name}
                        className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-lg ${stat.color}`}>
                                <stat.icon className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                        <p className="text-sm text-gray-600 mb-2">{stat.name}</p>
                        <p className="text-xs text-gray-500">{stat.change}</p>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <a
                        href="/admin/blog/new"
                        className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center"
                    >
                        <FileText className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="font-medium text-gray-700">Create New Post</p>
                    </a>
                    <a
                        href="/admin/messages"
                        className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-colors text-center"
                    >
                        <MessageSquare className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="font-medium text-gray-700">View Messages</p>
                    </a>
                    <a
                        href="/admin/settings"
                        className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors text-center"
                    >
                        <Users className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="font-medium text-gray-700">Manage Settings</p>
                    </a>
                </div>
            </div>

            {/* Welcome Message */}
            <div className="bg-gradient-to-r from-blue-600 to-orange-500 rounded-xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-2">🎉 Welcome to EntreHub CMS!</h2>
                <p className="text-blue-50 mb-4">
                    Your blog CMS is ready to use. Start by creating your first blog post or managing your content.
                </p>
                <div className="flex gap-4">
                    <a
                        href="/admin/blog"
                        className="px-6 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
                    >
                        Manage Blog
                    </a>
                    <a
                        href="/blog"
                        target="_blank"
                        className="px-6 py-2 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/30 transition-colors"
                    >
                        View Public Site
                    </a>
                </div>
            </div>
        </div>
    );
}
