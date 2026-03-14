import { useEffect, useState } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { JournalEntryType } from '../lib/types';

const useJournal = () => {
  const [entries, setEntries] = useState<JournalEntryType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchEntries = async () => {
    setLoading(true);
    const querySnapshot = await getDocs(collection(db, 'journalEntries'));
    const fetchedEntries: JournalEntryType[] = [];
    querySnapshot.forEach((doc) => {
      fetchedEntries.push({ id: doc.id, ...doc.data() } as JournalEntryType);
    });
    setEntries(fetchedEntries);
    setLoading(false);
  };

  const saveEntry = async (entry: JournalEntryType) => {
    await addDoc(collection(db, 'journalEntries'), entry);
    fetchEntries(); // Refresh entries after saving
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  return { entries, saveEntry, loading };
};

export default useJournal;