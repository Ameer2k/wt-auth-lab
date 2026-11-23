import { useState } from "react";
import { useNavigate } from "react-router";
import EntryForm from "../components/EntryForm";
import { createEntry } from "../services/entryService";

function CreateEntryPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(formData) {
    setSubmitting(true);
    setError("");
    try {
      await createEntry(formData);
      navigate("/my-entries");
    } catch (requestError) {
      setError(
        requestError.response?.data?.message || "Unable to create entry.",
      );
      setSubmitting(false);
    }
  }

  return (
    <main>
      <h1>Create Entry</h1>
      {error && <p className="error">{error}</p>}
      <EntryForm
        submitLabel={submitting ? "Creating..." : "Create Entry"}
        submitting={submitting}
        onSubmit={handleSubmit}
      />
    </main>
  );
}

export default CreateEntryPage;
