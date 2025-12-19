"use client";

import { Button } from "@/components/ui/Button";
import { GlassContainer } from "@/components/ui/GlassContainer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate login delay
        setTimeout(() => {
            setIsLoading(false);
            // Redirect to dashboard
            router.push('/dashboard');
        }, 1500);
    };

    return (
        <main style={{
            minHeight: 'calc(100vh - 64px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
        }}>
            <GlassContainer style={{ maxWidth: '400px', width: '100%', padding: '40px' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', fontWeight: 700 }}>Welcome Back</h1>
                    <p style={{ color: 'var(--md-sys-color-secondary)' }}>Sign in to access your dashboard</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div>
                        <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="student@university.edu"
                            required
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid var(--input-border)',
                                background: 'var(--input-background)',
                                color: 'var(--input-color)',
                                fontSize: '1rem'
                            }}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            required
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid var(--input-border)',
                                background: 'var(--input-background)',
                                color: 'var(--input-color)',
                                fontSize: '1rem'
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', fontSize: '0.875rem' }}>
                        <Link href="#" style={{ color: 'var(--md-sys-color-primary)', textDecoration: 'none' }}>
                            Forgot password?
                        </Link>
                    </div>

                    <Button
                        variant="filled"
                        type="submit"
                        disabled={isLoading}
                        style={{ height: '48px', fontSize: '1rem', marginTop: '0.5rem' }}
                    >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </Button>
                </form>

                <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.875rem' }}>
                    <span style={{ color: 'var(--md-sys-color-secondary)' }}>Don't have an account? </span>
                    <Link href="#" style={{ color: 'var(--md-sys-color-primary)', fontWeight: 600 }}>
                        Sign up
                    </Link>
                </div>
            </GlassContainer>
        </main>
    );
}
