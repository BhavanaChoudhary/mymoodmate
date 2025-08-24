import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { getUserEntries, createEntry, getUserStreak } from '../api/journalApi';
import './design/HomePage.css';

function HomePage({ user, onLogout }) {
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const [entries, setEntries] = useState([]);
  const [streak, setStreak] = useState(null);
  const [newEntry, setNewEntry] = useState("");

  const userId = user?.id;

  useEffect(() => {
    if (userId) {
      getUserEntries(userId).then(res => setEntries(res.data));
      getUserStreak(userId).then(res => setStreak(res.data));
    }
  }, [userId]);

  const toggleUserMenu = () => {
    setUserMenuOpen(!isUserMenuOpen);
  };

  const handleAddEntry = () => {
    if (!newEntry.trim()) return;
    createEntry(userId, { content: newEntry }).then(res => {
      setEntries([...entries, res.data]);
      setNewEntry("");
      getUserStreak(userId).then(res => setStreak(res.data));
    });
  };

  return (
    <div className="home-page">
      <nav className="navbar">
        <span>Ciao {user.firstname}!</span>
        <div className="nav-icons">
          <FaUser className="user-icon" onClick={toggleUserMenu} />
          {isUserMenuOpen && (
            <div className="custom-menu">
              <ul>
                <li>Profilo</li>
                <li>News</li>
                <li onClick={onLogout}>Logout</li>
              </ul>
            </div>
          )}
          <FaShoppingCart className="cart-icon"/>
        </div>
      </nav>
      <header>
        <h1>Welcome, {user.firstname}!</h1>
      </header>
      <main>
        {/* Journal Section */}
        <div style={{ padding: "20px", marginTop: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
          <h2>📔 My Journal</h2>
          <textarea
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            placeholder="Write your thoughts..."
            style={{ width: "300px", height: "100px", padding: "10px", fontSize: "16px" }}
          />
          <br />
          <button 
            onClick={handleAddEntry}
            style={{ padding: "10px 20px", marginTop: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
          >
            Save Entry
          </button>

          <h3>🔥 Current Streak: {streak?.streakCount || 0} days</h3>

          <div style={{ marginTop: "20px" }}>
            <h4>Your Journal Entries:</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {entries.map(entry => (
                <li key={entry.id} style={{ padding: "10px", borderBottom: "1px solid #eee", marginBottom: "10px" }}>
                  {entry.content}
                  <br />
                  <small style={{ color: "#666" }}>{new Date(entry.createdAt).toLocaleDateString()}</small>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;

