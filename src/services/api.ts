import axios, { AxiosResponse } from 'axios';
import { User, LoginRequest, LoginResponse, RegisterResponse, Coffee, CreateCoffeeRequest } from '../types/api';

const API_BASE = 'http://localhost:8080';

const api = axios.create({
    baseURL: API_BASE,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests automatically
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authService = {
    register: async (user: User): Promise<RegisterResponse> => {
        const response: AxiosResponse<RegisterResponse> = await api.post('/coffee/auth/register', user);
        return response.data;
    },

    login: async (loginData: LoginRequest): Promise<LoginResponse> => {
        const response: AxiosResponse<LoginResponse> = await api.post('/coffee/auth/login', loginData);
        return response.data;
    },
};

export const coffeeService = {
    getAllCoffees: async (): Promise<Coffee[]> => {
        const response: AxiosResponse<Coffee[]> = await api.get('/api/v1/coffees/');
        return response.data;
    },

    getCoffeeByName: async (name: string): Promise<Coffee> => {
        const response: AxiosResponse<Coffee> = await api.get(`/api/v1/coffees/search/name/${name}`);
        return response.data;
    },

    getCoffeesByOrigin: async (origin: string): Promise<Coffee[]> => {
        const response: AxiosResponse<Coffee[]> = await api.get(`/api/v1/coffees/search/origin/${origin}`);
        return response.data;
    },

    getCoffeesByType: async (type: string): Promise<Coffee[]> => {
        const response: AxiosResponse<Coffee[]> = await api.get(`/api/v1/coffees/search/type/${type}`);
        return response.data;
    },

    createCoffee: async (coffee: CreateCoffeeRequest): Promise<Coffee> => {
        const response: AxiosResponse<Coffee> = await api.post('/api/v1/coffees/', coffee);
        return response.data;
    },

    updateCoffee: async (name: string, coffee: CreateCoffeeRequest): Promise<Coffee> => {
        const response: AxiosResponse<Coffee> = await api.put(`/api/v1/coffees/update/name/${name}`, coffee);
        return response.data;
    },

    deleteCoffee: async (name: string): Promise<void> => {
        await api.delete(`/api/v1/coffees/delete/name/${name}`);
    },
};
