const fs = require('fs');
const path = require('path');
const router = require('express').Router();
const db = require('../../db/db.json');

// API GET request
router.get('/notes', (req, res) => {
    res.json(db);
});

// API POST request
router.post('/notes', (req, res) => {
    const note = req.body;
    const notes = db;

    note.id = notes.length + 1;

    notes.push(note);

    fs.writeFileSync('./db/db.json', JSON.stringify(notes));

    res.json(db);
});

// API DELETE request
router.delete('/notes/:id', (req, res) => {
    const delId = parseInt(req.params.id);
    let notes = db;
    
    notes = notes.filter(note => note.id !== delId);

    fs.writeFileSync('./db/db.json', JSON.stringify(notes));

    res.json(db);
});

module.exports = router;