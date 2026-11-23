import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import EntryForm from "../components/EntryForm";
import { getMyEntries, updateEntry } from "../services/entryService";

function EditEntryPage() {
  const { entryId } = useParams();
  const navigate = useNavigate();
  const [entry, setEntry] = useState(null);

  useEffect(() => {
    async function loadEntry() {
      try {
        const entries = await getMyEntries();
        const currentEntry = entries.find((item) => item._id === entryId);
        setEntry(currentEntry);
      } catch (error) {
        console.error(error);
      }
    }

    loadEntry();
  }, [entryId]);

  async function handleSubmit(formData) {
    try {
      await updateEntry(entryId, formData);
      navigate("/my-entries");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main>
      <h1>Edit Entry</h1>
      {entry && (
        <EntryForm
          key={entry._id}
          initialValue={entry}
          submitLabel="Save Changes"
          onSubmit={handleSubmit}
        />
      )}
    </main>
  );
}

export default EditEntryPage;
