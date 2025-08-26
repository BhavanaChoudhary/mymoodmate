// FlipbookComponent.jsx
import React, { useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import "./design/FlipbookComponent.css";

const FlipbookComponent = ({ entries }) => {
  const flipBookRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);

  if (!entries || entries.length === 0) {
    return (
      <div className="no-entries">
        <p>No journal entries yet. Start writing to see them here!</p>
      </div>
    );
  }

  return (
    <div className="flipbook-container">
      <HTMLFlipBook
  width={400}
  height={600}
  size="stretch"        // allows book to resize with screen
  minWidth={315}
  maxWidth={1000}
  minHeight={400}
  maxHeight={1500}
  maxShadowOpacity={0.5}
  showCover={true}      // cover page on the left, next page on the right
  drawShadow={true}
  usePortrait={false}   // <--- force double-page view (book-like)
  startPage={0}         // always starts at cover
>
        {/* Cover Page */}
        <div className="page page-cover">
          <div className="page-content cover">
            <h1 className="journal-title">📖 My Journal</h1>
            <p className="journal-subtitle">Personal Reflections</p>
          </div>
        </div>

        {/* Journal Pages */}
        {entries.map(([date, dateEntries]) => (
          <div className="page journal-page" key={date}>
            <div className="page-content">
              <h2 className="entry-date">{date}</h2>
              <div className="entries-list">
                {dateEntries.map((entry) => (
                  <div className="journal-entry" key={entry.id}>
                    <p className="entry-content">{entry.content}</p>
                    <p className="entry-time">
                      {new Date(entry.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Back Cover */}
        <div className="page page-cover page-back">
          <div className="page-content cover">
            <p className="journal-subtitle">✨ The End</p>
            <p>Keep writing your story...</p>
          </div>
        </div>
      </HTMLFlipBook>

      {/* Navigation Controls */}
      <div className="flipbook-controls">
        <button
          onClick={() => flipBookRef.current.pageFlip().flipPrev()}
          className="control-btn prev-btn"
        >
          ← Previous
        </button>
        <span className="page-indicator">
          Page {currentPage + 1} of {entries.length + 2}
        </span>
        <button
          onClick={() => flipBookRef.current.pageFlip().flipNext()}
          className="control-btn next-btn"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default FlipbookComponent;
