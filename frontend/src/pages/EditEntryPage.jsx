import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import EntryForm from "../components/EntryForm";
import { getMyEntries, updateEntry } from "../services/entryService";

function EditEntryPage() {
  const { entryId } = useParams();
  const navigate = useNavigate();
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getMyEntries()
      .then((entries) => {
        const currentEntry = entries.find((item) => item._id === entryId);
        if (!currentEntry) {
          setError("Entry not found.");
          return;
        }
        setEntry(currentEntry);
      })
      .catch((requestError) => {
        setError(
          requestError.response?.data?.message || "Unable to load entry.",
        );
      })
      .finally(() => setLoading(false));
  }, [entryId]);

  async function handleSubmit(formData) {
    setSubmitting(true);
    setError("");
    try {
      await updateEntry(entryId, formData);
      navigate("/my-entries");
    } catch (requestError) {
      setError(
        requestError.response?.data?.message || "Unable to update entry.",
      );
      setSubmitting(false);
    }
  }

  if (loading) return <main><p>Loading entry...</p></main>;

  return (
    <main>
      <h1>Edit Entry</h1>
      {error && <p className="error">{error}</p>}
      {entry && (
        <EntryForm
          key={entry._id}
          initialValue={entry}
          submitLabel={submitting ? "Saving..." : "Save Changes"}
          submitting={submitting}
          onSubmit={handleSubmit}
        />
      )}
    </main>
  );
}

export default EditEntryPage;
