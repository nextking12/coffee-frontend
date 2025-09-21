'use client'

import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { User, LoginRequest } from '@/types/api';
import AuthForms from '@/components/AuthForms';
import Dashboard from '@/components/Dashboard';

export default function Home() {
    const { isAuthenticated, isLoading, register, login, logout } = useAuth();
    const [message, setMessage] = useState<string>('');

    const handleRegister = async (user: User): Promise<void> => {
        try {
            const successMessage = await register(user);
            setMessage(successMessage);
        } catch (error) {
            setMessage(error as string);
        }
    };

    const handleLogin = async (loginData: LoginRequest): Promise<void> => {
        try {
            const successMessage = await login(loginData);
            setMessage(successMessage);
        } catch (error) {
            setMessage(error as string);
        }
    };

    const handleLogout = (): void => {
        logout();
        setMessage('Logged out successfully');
    };
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold text-center mb-8">
                    ☕ Coffee Backend Tester (Next.js + TypeScript)
                </h1>

                {message && (
                    <div className="bg-green-500 text-white p-4 rounded-lg mb-6 max-w-2xl mx-auto flex justify-between
items-center">
                        {message}
                        <button
                            onClick={() => setMessage('')}
                            className="text-white hover:text-gray-200"
                        >
                            ×
                        </button>
                    </div>
                )}
                {!isAuthenticated ? (
                    <AuthForms
                        onRegister={handleRegister}
                        onLogin={handleLogin}
                        isLoading={isLoading}
                    />
                ) : (
                    <Dashboard
                        onLogout={handleLogout}
                        onMessage={setMessage}
                    />
                )}
            </div>
        </main>
    );
}