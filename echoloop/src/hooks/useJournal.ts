"use client";

import { useEffect, useState } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { JournalEntryType } from "@/lib/types";

export const useJournal = () => {
  const [entries, setEntries] = useState<JournalEntryType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEntries = async () => {
    setLoading(true);

    try {
      const querySnapshot = await getDocs(collection(db, "journalEntries"));
      const fetchedEntries = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<JournalEntryType, "id">),
      }));

      setEntries(fetchedEntries);
    } finally {
      setLoading(false);
    }
  };

  const saveEntry = async (entry: JournalEntryType) => {
    await addDoc(collection(db, "journalEntries"), entry);
    await fetchEntries();
  };

  useEffect(() => {
    let cancelled = false;

    const loadEntries = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "journalEntries"));
        const fetchedEntries = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<JournalEntryType, "id">),
        }));

        if (!cancelled) {
          setEntries(fetchedEntries);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadEntries();

    return () => {
      cancelled = true;
    };
  }, []);

  return { entries, saveEntry, loading };
};

export default useJournal;
