import { useNavigate } from "react-router";
import EntryForm from "../components/EntryForm";
import { createEntry } from "../services/entryService";

function CreateEntryPage() {
  const navigate = useNavigate();

  async function handleSubmit(formData) {
    try {
      await createEntry(formData);
      navigate("/my-entries");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main>
      <h1>Create Entry</h1>
      <EntryForm
        submitLabel="Create Entry"
        onSubmit={handleSubmit}
      />
    </main>
  );
}

export default CreateEntryPage;
