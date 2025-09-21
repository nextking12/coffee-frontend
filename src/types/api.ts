


export interface User {
    id?: number;
    username: string;
    email: string;
    password: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    message: string;
}

export interface RegisterResponse {
    message: string;
}

export interface Coffee {
    id: number;
    name: string;
    type: string;
    origin: string;
    grindSize: number;
    weightInGrams: number;
}

export interface CreateCoffeeRequest {
    name: string;
    type: string;
    origin: string;
    grindSize: number;
    weightInGrams: number;
}

export interface ApiError {
    error: string;
    message?: string;
}

export interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}