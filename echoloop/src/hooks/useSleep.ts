"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { SleepEntryType } from "@/lib/types";

export const useSleep = () => {
  const [sleepData, setSleepData] = useState<SleepEntryType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchSleepData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "sleepData"));
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<SleepEntryType, "id">),
        }));

        if (!cancelled) {
          setSleepData(data);
        }
      } catch (error) {
        console.error("Error fetching sleep data: ", error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void fetchSleepData();

    return () => {
      cancelled = true;
    };
  }, []);

  const importSleepData = async (newSleepData: SleepEntryType) => {
    try {
      const docRef = await addDoc(collection(db, "sleepData"), newSleepData);
      setSleepData((prevData) => [...prevData, { ...newSleepData, id: docRef.id }]);
    } catch (error) {
      console.error("Error importing sleep data: ", error);
    }
  };

  return { sleepData, loading, importSleepData };
};

export default useSleep;
