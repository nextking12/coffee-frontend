import { useState, useEffect } from 'react';
import { authService } from '../services/api';
import { User, LoginRequest, AuthState } from '../types/api';

export const useAuth = () => {
    const [authState, setAuthState] = useState<AuthState>({
        token: localStorage.getItem('authToken'),
        isAuthenticated: !!localStorage.getItem('authToken'),
        isLoading: false,
    });

    const register = async (user: User): Promise<string> => {
        setAuthState(prev => ({ ...prev, isLoading: true }));
        try {
            const response = await authService.register(user);
            setAuthState(prev => ({ ...prev, isLoading: false }));
            return response.message;
        } catch (error: any) {
            setAuthState(prev => ({ ...prev, isLoading: false }));
            throw error.response?.data?.error || 'Registration failed';
        }
    };

    const login = async (loginData: LoginRequest): Promise<string> => {
        setAuthState(prev => ({ ...prev, isLoading: true }));
        try {
            const response = await authService.login(loginData);
            const { token } = response;

            localStorage.setItem('authToken', token);
            setAuthState({
                token,
                isAuthenticated: true,
                isLoading: false,
            });

            return response.message;
        } catch (error: any) {
            setAuthState(prev => ({ ...prev, isLoading: false }));
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
};
