import React, { useState, useEffect, Suspense } from "react";
import { FaUser } from "react-icons/fa";
import { getUserEntries, createEntry, getUserStreak } from "../api/journalApi";
import "./design/HomePage.css";

function HomePage({ user, onLogout }) {
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const [entries, setEntries] = useState([]);
  const [streak, setStreak] = useState(null);
  const [newEntry, setNewEntry] = useState("");
  const [isBookOpen, setBookOpen] = useState(false);

  const userId = user?.id;

  useEffect(() => {
    if (userId) {
      getUserEntries(userId).then((res) => setEntries(res.data));
      getUserStreak(userId).then((res) => setStreak(res.data));
    }
  }, [userId]);

  const toggleUserMenu = () => setUserMenuOpen(!isUserMenuOpen);

  const handleAddEntry = () => {
    if (!newEntry.trim()) return;
    createEntry(userId, { content: newEntry }).then((res) => {
      setEntries([...entries, res.data]);
      setNewEntry("");
      getUserStreak(userId).then((res) => setStreak(res.data));
    });
  };

  // group entries by date
  const entriesByDate = entries.reduce((acc, entry) => {
    const date = new Date(entry.createdAt).toLocaleDateString();
    acc[date] = acc[date] || [];
    acc[date].push(entry);
    return acc;
  }, {});
  const dateEntries = Object.entries(entriesByDate);

  const FlipbookComponent = React.lazy(() => import("./FlipbookComponent"));

  return (
    <div className="home-page">
      {/* Navbar */}
      <nav className="navbar glassy-nav">
        <span className="logo-text">✨ JournalSpace</span>
        <div className="nav-icons">
          <span className="welcome-text">Hello, {user.firstname}!</span>
          <FaUser className="user-icon" onClick={toggleUserMenu} />
          {isUserMenuOpen && (
            <div className="custom-menu glassy-menu">
              <ul>
                <li onClick={onLogout}>🚪 Logout</li>
              </ul>
            </div>
          )}
        </div>
      </nav>

      <main className="main-layout">
        {/* Left: Journal Writing */}
        <div className="journal-panel glassy-card">
          <h2>✍️ Write a New Entry</h2>
          <textarea
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            placeholder="Write your thoughts..."
            className="entry-textarea"
          />
          <button onClick={handleAddEntry} className="save-entry-btn">
            Save Entry
          </button>

          {/* Streak */}
          <div className="streak-counter">
            <h3>🔥 Current Streak: {streak?.streakCount || 0} days</h3>
          </div>
        </div>

        {/* Right: Flipbook */}
        <div
          className={`flipbook-container ${isBookOpen ? "open" : "closed"}`}
          onClick={() => setBookOpen(!isBookOpen)}
        >
          <Suspense fallback={<div className="loading">Loading flipbook...</div>}>
            <FlipbookComponent entries={dateEntries} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}

export default HomePage;