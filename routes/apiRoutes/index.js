const fs = require('fs');
const router = require('express').Router();
const uuid = require('../../helpers/uuid');

// API GET request
router.get('/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    res.json(notes);
});

// API POST request
router.post('/notes', (req, res) => {
    const note = req.body;
    const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    const idArr = [];

    notes.forEach(note => {
        idArr.push(note.id);
    });
    
    note.id = uuid();

    if(idArr.length) {
        for(i = 0; i < idArr.length; i++) {
            if(note.id !== idArr[i]) {
                notes.push(note);
                break;
            } else {
                note.id = uuid();
            };
        };
    } else {
        notes.push(note);
    };
    

    fs.writeFileSync('./db/db.json', JSON.stringify(notes, null, 2));
    
    res.json(note);
});

// API DELETE request
router.delete('/notes/:id', (req, res) => {
    const delId = req.params.id;
    const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    const keepNotes = [];

    notes.forEach(note => {
        if(note.id !== delId) {
            keepNotes.push(note);
        };
    });

    fs.writeFileSync('./db/db.json', JSON.stringify(keepNotes, null, 2));
    res.send('DELETE request received');
});

module.exports = router;