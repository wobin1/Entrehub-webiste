'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function AdminLoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Login failed');
            }

            // Store token
            localStorage.setItem('admin_token', data.token);

            // Redirect to dashboard
            router.push('/admin/dashboard');
        } catch (error: unknown) {
            setError(error instanceof Error ? error.message : 'Invalid credentials');
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
            <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <span className="mb-5 inline-flex h-14 w-14 overflow-hidden rounded-2xl shadow-sm ring-1 ring-slate-200">
                        <Image src="/images/logo.jpeg" alt="" width={56} height={56} className="h-full w-full object-cover" priority />
                    </span>
                    <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-900">Admin sign in</h1>
                    <p className="text-slate-600">Sign in to manage the ENTREHUB website.</p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
                    <div role="alert">
                        {error && (
                            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4">
                                <p className="text-sm font-medium text-red-800">{error}</p>
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-800">
                                Email address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                autoComplete="username"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                disabled={isLoading}
                                aria-invalid={error ? true : undefined}
                                className="w-full rounded-lg border border-slate-400 px-4 py-3 text-slate-900 placeholder:text-slate-500 focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/30 disabled:cursor-not-allowed disabled:bg-slate-100"
                                placeholder="admin@entrehub.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-800">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                autoComplete="current-password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                disabled={isLoading}
                                aria-invalid={error ? true : undefined}
                                className="w-full rounded-lg border border-slate-400 px-4 py-3 text-slate-900 focus:border-navy focus:outline-none focus:ring-2 focus:ring-navy/30 disabled:cursor-not-allowed disabled:bg-slate-100"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-navy px-6 font-semibold text-white shadow-sm transition-colors hover:bg-navy-hover disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isLoading ? (
                                <>
                                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" aria-hidden="true" />
                                    Signing in…
                                </>
                            ) : (
                                <>
                                    <LogIn className="h-5 w-5" aria-hidden="true" />
                                    Sign in
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <p className="mt-6 text-center">
                    <Link href="/" className="inline-flex min-h-11 items-center gap-1.5 text-sm text-slate-600 transition-colors hover:text-navy">
                        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                        Back to website
                    </Link>
                </p>
            </div>
        </main>
    );
}
