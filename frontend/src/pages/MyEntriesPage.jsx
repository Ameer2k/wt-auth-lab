import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import EntryList from "../components/EntryList";
import { deleteEntry, getMyEntries } from "../services/entryService";

function MyEntriesPage() {
  const { user } = useAuth();
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    async function loadEntries() {
      try {
        const data = await getMyEntries();
        setEntries(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadEntries();
  }, []);

  async function handleDelete(entryId) {
    try {
      await deleteEntry(entryId);
      setEntries(entries.filter((entry) => entry._id !== entryId));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main>
      <h1>My Entries</h1>
      <EntryList entries={entries} user={user} onDelete={handleDelete} />
    </main>
  );
}

export default MyEntriesPage;
