const fs = require('fs');
const util = require('util');
const router = require('express').Router();
const db = require('../../db/db.json');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// API GET request
router.get('/notes', (req, res) => {
    readFileAsync('./db/db.json', 'utf-8').then(data => {
        const notes = [].concat(JSON.parse(data))
        res.json(notes);
    });
});

// API POST request
router.post('/notes', (req, res) => {
    const note = req.body;
    readFileAsync('./db/db.json', 'utf-8')
        .then(data => {
            const notes = [].concat(JSON.parse(data));
            note.id = notes.length + 1;
            notes.push(note);
            return notes;
        }).then(notes => {
            writeFileAsync('./db/db.json', JSON.stringify(notes))
            res.json(note);
        });
});

// API DELETE request
router.delete('/notes/:id', (req, res) => {
    const delId = parseInt(req.params.id);
    readFileAsync('./db/db.json', 'utf-8')
        .then(data => {
            const notes = [].concat(JSON.parse(data));
            const keepNotes = [];

            notes.forEach(note => {
                if(note.id !== delId) {
                    keepNotes.push(note);
                };
            });

            return keepNotes;
        }).then(notes => {
            writeFileAsync('./db/db.json', JSON.stringify(notes))
            res.send('DELETE request received');
        });
});

module.exports = router;