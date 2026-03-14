import { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { JournalEntry } from '../lib/types';

const useInsights = () => {
    const [insights, setInsights] = useState<JournalEntry[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchInsights = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'journalEntries'));
                const entries: JournalEntry[] = [];
                querySnapshot.forEach((doc) => {
                    entries.push({ id: doc.id, ...doc.data() } as JournalEntry);
                });
                setInsights(entries);
            } catch (error) {
                console.error("Error fetching insights: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchInsights();
    }, []);

    const analyzeInsights = () => {
        // Logic to analyze insights and generate reflection data
        // This can include calculating mood trends, entry frequency, etc.
    };

    return { insights, loading, analyzeInsights };
};

export default useInsights;