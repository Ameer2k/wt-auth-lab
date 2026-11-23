import { Link } from "react-router";

function EntryList({ entries, user, onDelete }) {
  if (entries.length === 0) {
    return <p>No Entries made yet</p>;
  }

  return (
    <div className="entry-list">
      {entries.map((entry) => {
        const ownerId =
          typeof entry.owner === "string" ? entry.owner : entry.owner?._id;
        const isOwner = user && String(ownerId) === String(user._id);

        return (
          <article className="entry-card" key={entry._id}>
            <h2>{entry.title}</h2>
            <p>{entry.entryBody}</p>
            <p>{entry.isPublic ? "Public" : "Private"}</p>
            {isOwner && (
              <div className="entry-actions">
                <Link to={`/entries/${entry._id}/edit`}>Edit</Link>
                <button type="button" onClick={() => onDelete(entry._id)}>
                  Delete
                </button>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}

export default EntryList;
