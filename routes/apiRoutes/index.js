const fs = require('fs');
const util = require('util');
const router = require('express').Router();
const db = require('../../db/db.json');

const writeFileAsync = util.promisify(fs.writeFile);

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

    writeFileAsync('./db/db.json', JSON.stringify(notes));

    res.json(db);
});

// API DELETE request
router.delete('/notes/:id', (req, res) => {
    const delId = parseInt(req.params.id);
    const keepNotes = db.filter(note => note.id !== delId);


        writeFileAsync('./db/db.json', JSON.stringify(keepNotes))


    res.json(db);
});

module.exports = router;