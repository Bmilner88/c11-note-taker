const fs = require('fs');
const router = require('express').Router();

// API GET request
router.get('/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    res.json(notes);
});

// API POST request
router.post('/notes', (req, res) => {
    const note = req.body;
    const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
        
    note.id = notes.length + 1;
    notes.push(note);
            
    fs.writeFileSync('./db/db.json', JSON.stringify(notes))
    
    res.json(note);
});

// API DELETE request
router.delete('/notes/:id', (req, res) => {
    const delId = parseInt(req.params.id);
    const notes = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    const keepNotes = [];

    notes.forEach(note => {
        if(note.id !== delId) {
            keepNotes.push(note);
        };
    });

    fs.writeFileSync('./db/db.json', JSON.stringify(keepNotes))
    res.send('DELETE request received');
});

module.exports = router;