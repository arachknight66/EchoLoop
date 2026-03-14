"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { JournalEntryType } from "@/lib/types";

export const useInsights = () => {
  const [insights, setInsights] = useState<JournalEntryType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchInsights = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "journalEntries"));
        const entries = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<JournalEntryType, "id">),
        }));

        if (!cancelled) {
          setInsights(entries);
        }
      } catch (error) {
        console.error("Error fetching insights: ", error);
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void fetchInsights();

    return () => {
      cancelled = true;
    };
  }, []);

  return { insights, loading };
};

export default useInsights;
