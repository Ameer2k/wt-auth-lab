import { useState } from "react";

function EntryForm({ initialValue, submitLabel, submitting, onSubmit }) {
  const [formData, setFormData] = useState({
    title: initialValue?.title || "",
    entryBody: initialValue?.entryBody || "",
    isPublic: initialValue?.isPublic || false,
  });

  function handleChange(event) {
    const { name, type, value, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input
        id="title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        maxLength={100}
        required
      />

      <label htmlFor="entryBody">Entry</label>
      <textarea
        id="entryBody"
        name="entryBody"
        value={formData.entryBody}
        onChange={handleChange}
        maxLength={350}
        rows={6}
      />

      <label className="checkbox-label" htmlFor="isPublic">
        <input
          id="isPublic"
          name="isPublic"
          type="checkbox"
          checked={formData.isPublic}
          onChange={handleChange}
        />
        Public entry
      </label>

      <button type="submit" disabled={submitting}>{submitLabel}</button>
    </form>
  );
}

export default EntryForm;
