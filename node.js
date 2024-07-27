const express = require('express');
const path = require('path');
const db = require('./database'); // Import the database

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON body
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// API endpoints
// Save a note
app.post('/notes', (req, res) => {
    const { content } = req.body;
    db.run('INSERT INTO notes (content) VALUES (?)', [content], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: this.lastID });
    });
});

// List all notes
app.get('/notes', (req, res) => {
    db.all('SELECT * FROM notes', (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Delete a note by ID
app.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    db.run('DELETE FROM notes WHERE id = ?', id, function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Note deleted', changes: this.changes });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
