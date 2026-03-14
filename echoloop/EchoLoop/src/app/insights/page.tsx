import React from 'react';
import InsightsPanel from '@/components/InsightsPanel';
import { useInsights } from '@/hooks/useInsights';

const InsightsPage = () => {
    const { insights } = useInsights();

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <h1 className="text-2xl font-bold mb-4">Reflection Insights</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {insights.map((insight, index) => (
                    <InsightsPanel key={index} insight={insight} />
                ))}
            </div>
        </div>
    );
};

export default InsightsPage;