import MessagesClient from './MessagesClient';

export default function AdminMessagesPage() {
    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                    Contact Messages
                </h1>
                <p className="text-gray-600 mt-2">
                    Manage and respond to inquiries from your website visitors.
                </p>
            </div>

            <MessagesClient />
        </div>
    );
}
