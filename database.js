const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create or open the SQLite database file
const dbPath = path.resolve(__dirname, 'notes.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err);
    } else {
        console.log('Connected to the SQLite database');
        db.run(`CREATE TABLE IF NOT EXISTS notes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            content TEXT,
            created_at TEXT DEFAULT CURRENT_TIMESTAMP
        )`, (err) => {
            if (err) {
                console.error('Error creating table', err);
            } else {
                console.log('Table "notes" is ready');
            }
        });
    }
});

module.exports = db;
