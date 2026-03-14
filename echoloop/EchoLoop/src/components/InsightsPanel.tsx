import React from 'react';
import { useInsights } from '../hooks/useInsights';

const InsightsPanel: React.FC = () => {
    const { insights } = useInsights();

    return (
        <div className="p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Reflection Insights</h2>
            {insights.length === 0 ? (
                <p>No insights available. Start journaling to see your reflections here!</p>
            ) : (
                <ul className="space-y-2">
                    {insights.map((insight, index) => (
                        <li key={index} className="p-2 border rounded-md bg-gray-100">
                            <p>{insight}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default InsightsPanel;