import React, {useState} from 'react';
import {User, LoginRequest} from '../types/api';

interface AuthFormsProps {
    onRegister: (user: User) => Promise<void>;
    onLogin: (loginData: LoginRequest) => Promise<void>;
    isLoading: boolean;
}

const AuthForms: React.FC<AuthFormsProps> = ({onRegister, onLogin, isLoading}) => {
    const [registerForm, setRegisterForm] = useState<User>({
        username: '',
        email: '',
        password: '',
    });

    const [loginForm, setLoginForm] = useState<LoginRequest>({
        username: '',
        password: '',
    });

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        await onRegister(registerForm);
        setRegisterForm({username: '', email: '', password: ''});
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        await onLogin(loginForm);
        setLoginForm({username: '', password: ''});
    };

    return (
        <div className="auth-forms">
            {/* Registration Form */}
            <div className="form-section">
                <h2>Register</h2>
                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={registerForm.username}
                        onChange={(e) => setRegisterForm({...registerForm, username: e.target.value})}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                        required
                    />
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Registering...' : 'Register'}
                    </button>
                </form>
            </div>

            {/* Login Form */}
            <div className="form-section">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={loginForm.username}
                        onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                        required
                    />
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AuthForms;
