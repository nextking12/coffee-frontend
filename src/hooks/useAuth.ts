import { useState, useEffect } from 'react';
import { authService } from '../services/api';
import { User, LoginRequest, AuthState } from '../types/api';

export const useAuth = () => {
        const [authState, setAuthState] = useState<AuthState>({
            token: null,                    // Start with null
            isAuthenticated: false,         // Start with false
            isLoading: true,               // Start with loading true
        });

        // Use useEffect to safely access localStorage after component mounts
        useEffect(() => {
            const token = localStorage.getItem('authToken');
            setAuthState({
                token,
                isAuthenticated: !!token,
                isLoading: false,            // Set loading false after hydration
            });
        }, []);

        const register = async (user: User): Promise<string> => {
            setAuthState(prev => ({...prev, isLoading: true}));
            try {
                const response = await authService.register(user);
                setAuthState(prev => ({...prev, isLoading: false}));
                return response.message;
            } catch (error: any) {
                setAuthState(prev => ({...prev, isLoading: false}));
                throw error.response?.data?.error || 'Registration failed';
            }
        };

        const login = async (loginData: LoginRequest): Promise<string> => {
            setAuthState(prev => ({...prev, isLoading: true}));
            try {
                const response = await authService.login(loginData);
                const {token} = response;

                localStorage.setItem('authToken', token);
                setAuthState({
                    token,
                    isAuthenticated: true,
                    isLoading: false,
                });

                return response.message;
            } catch (error: any) {
                setAuthState(prev => ({...prev, isLoading: false}));
                throw error.response?.data?.error || 'Login failed';
            }
        };

        const logout = (): void => {
            localStorage.removeItem('authToken');
            setAuthState({
                token: null,
                isAuthenticated: false,
                isLoading: false,
            });
        };

        return {
            ...authState,
            register,
            login,
            logout,
        };
    }
