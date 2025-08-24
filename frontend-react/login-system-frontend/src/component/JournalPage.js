import React, { useEffect, useState } from "react";
import { getUserEntries, createEntry, getUserStreak } from "../api/journalApi";

const JournalPage = () => {
  const [entries, setEntries] = useState([]);
  const [streak, setStreak] = useState(null);
  const [newEntry, setNewEntry] = useState("");

  const userId = 1; // later: replace with logged-in user

  useEffect(() => {
    getUserEntries(userId).then(res => setEntries(res.data));
    getUserStreak(userId).then(res => setStreak(res.data));
  }, []);

  const handleAddEntry = () => {
    if (!newEntry.trim()) return;
    createEntry(userId, { content: newEntry }).then(res => {
      setEntries([...entries, res.data]);
      setNewEntry("");
      getUserStreak(userId).then(res => setStreak(res.data));
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📔 My Journal</h2>
      <textarea
        value={newEntry}
        onChange={(e) => setNewEntry(e.target.value)}
        placeholder="Write your thoughts..."
        style={{ width: "300px", height: "100px" }}
      />
      <br />
      <button onClick={handleAddEntry}>Save Entry</button>

      <h3>🔥 Current Streak: {streak?.streakCount || 0} days</h3>

      <ul>
        {entries.map(entry => (
          <li key={entry.id}>{entry.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default JournalPage;
