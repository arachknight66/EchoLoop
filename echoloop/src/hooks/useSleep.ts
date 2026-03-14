import { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

const useSleep = () => {
    const [sleepData, setSleepData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSleepData = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'sleepData'));
                const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setSleepData(data);
            } catch (error) {
                console.error("Error fetching sleep data: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSleepData();
    }, []);

    const importSleepData = async (newSleepData) => {
        try {
            await addDoc(collection(db, 'sleepData'), newSleepData);
            setSleepData(prevData => [...prevData, newSleepData]);
        } catch (error) {
            console.error("Error importing sleep data: ", error);
        }
    };

    return { sleepData, loading, importSleepData };
};

export default useSleep;