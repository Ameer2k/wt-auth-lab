import api from "./api";

export async function getEntries() {
  const response = await api.get("/entries");
  return response.data;
}

export async function getMyEntries() {
  const response = await api.get("/entries/my-entries");
  return response.data;
}

export async function createEntry(entryData) {
  const response = await api.post("/entries", entryData);
  return response.data;
}

export async function updateEntry(entryId, entryData) {
  const response = await api.put(`/entries/${entryId}`, entryData);
  return response.data;
}

export async function deleteEntry(entryId) {
  await api.delete(`/entries/${entryId}`);
}
