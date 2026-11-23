import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import EntryList from "../components/EntryList";
import { deleteEntry, getEntries } from "../services/entryService";

function EntriesPage() {
  const { user } = useAuth();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getEntries()
      .then(setEntries)
      .catch((requestError) => {
        setError(
          requestError.response?.data?.message || "Unable to load entries.",
        );
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(entryId) {
    try {
      await deleteEntry(entryId);
      setEntries((currentEntries) =>
        currentEntries.filter((entry) => entry._id !== entryId),
      );
      setError("");
    } catch (requestError) {
      setError(
        requestError.response?.data?.message || "Unable to delete entry.",
      );
    }
  }

  if (loading) return <main><p>Loading entries...</p></main>;

  return (
    <main>
      <h1>Public Entries</h1>
      {error && <p className="error">{error}</p>}
      {(!error || entries.length > 0) && (
        <EntryList entries={entries} user={user} onDelete={handleDelete} />
      )}
    </main>
  );
}

export default EntriesPage;
