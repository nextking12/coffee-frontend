import React, { useState } from 'react';
import { Coffee, CreateCoffeeRequest } from '../types/api';
import { coffeeService } from '../services/api';
import CoffeeList from './CoffeeList';

interface DashboardProps {
    onLogout: () => void;
    onMessage: (message: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout, onMessage }) => {
    const [coffees, setCoffees] = useState<Coffee[]>([]);
    const [newCoffee, setNewCoffee] = useState<CreateCoffeeRequest>({
        name: '',
        type: '',
        origin: '',
        grindSize: 1,
        weightInGrams: 0,
    });

    const getCoffees = async (): Promise<void> => {
        try {
            const coffeeData = await coffeeService.getAllCoffees();
            setCoffees(coffeeData);
            onMessage(`Loaded ${coffeeData.length} coffees successfully!`);
        } catch (error: any) {
            onMessage('Failed to load coffees: ' + (error.response?.data?.error || 'Unauthorized'));
        }
    };
    const createCoffee = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        try {
            const createdCoffee = await coffeeService.createCoffee(newCoffee);
            setCoffees(prev => [...prev, createdCoffee]);
            setNewCoffee({ name: '', type: '', origin: '', grindSize: 1, weightInGrams: 0 });
            onMessage('Coffee created successfully!');
        } catch (error: any) {
            onMessage('Failed to create coffee: ' + (error.response?.data?.error || 'Unknown error'));
        }
    };

    return (
        <div className="dashboard">
            <h2>Coffee Dashboard</h2>

            <div className="dashboard-actions">
                <button onClick={getCoffees} className="primary-btn">Get All Coffees</button>
                <button onClick={onLogout} className="logout-btn">Logout</button>
            </div>

            <div className="create-coffee-section">
                <h3>Create New Coffee</h3>
                <form onSubmit={createCoffee} className="coffee-form">
                    <input
                        type="text"
                        placeholder="Coffee Name"
                        value={newCoffee.name}
                        onChange={(e) => setNewCoffee({ ...newCoffee, name: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Type (e.g., Espresso, Arabica)"
                        value={newCoffee.type}
                        onChange={(e) => setNewCoffee({ ...newCoffee, type: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Origin (e.g., Colombia, Ethiopia)"
                        value={newCoffee.origin}
                        onChange={(e) => setNewCoffee({ ...newCoffee, origin: e.target.value })}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Grind Size (1-10)"
                        min="1"
                        max="10"
                        value={newCoffee.grindSize}
                        onChange={(e) => setNewCoffee({ ...newCoffee, grindSize: parseInt(e.target.value) })}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Weight (grams)"
                        min="0"
                        step="0.1"
                        value={newCoffee.weightInGrams}
                        onChange={(e) => setNewCoffee({ ...newCoffee, weightInGrams: parseFloat(e.target.value) })}
                        required
                    />
                    <button type="submit" className="create-btn">Create Coffee</button>
                </form>
            </div>

            <CoffeeList coffees={coffees} />
        </div>
    );
};

export default Dashboard;