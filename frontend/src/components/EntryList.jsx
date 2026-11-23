import { Link } from "react-router";

function EntryList({ entries, user, onDelete }) {
  return (
    <div className="entry-list">
      {entries.map((entry) => (
        <article className="entry-card" key={entry._id}>
          <h2>{entry.title}</h2>
          <p>{entry.entryBody}</p>
          <p>{entry.isPublic ? "Public" : "Private"}</p>
          {user && entry.owner === user._id && (
            <div className="entry-actions">
              <Link to={`/entries/${entry._id}/edit`}>Edit</Link>
              <button type="button" onClick={() => onDelete(entry._id)}>
                Delete
              </button>
            </div>
          )}
        </article>
      ))}
    </div>
  );
}

export default EntryList;
