import React from 'react';
import { Coffee } from '../types/api';

interface CoffeeListProps {
    coffees: Coffee[];
}

const CoffeeList: React.FC<CoffeeListProps> = ({ coffees }) => {
    if (coffees.length === 0) {
        return <p>No coffees found. Create some coffee entries to see them here!</p>;
    }

    return (
        <div className="coffees-list">
            <h3>Coffee List ({coffees.length} items):</h3>
            <ul>
                {coffees.map((coffee: Coffee) => (
                    <li key={coffee.id} className="coffee-item">
                        <div className="coffee-header">
                            <strong>{coffee.name}</strong>
                            <span className="coffee-type">{coffee.type}</span>
                        </div>
                        <div className="coffee-details">
                            <span>Origin: {coffee.origin}</span>
                            <span>Grind Size: {coffee.grindSize}</span>
                            <span>Weight: {coffee.weightInGrams}g</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CoffeeList;
