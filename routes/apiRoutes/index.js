const fs = require('fs');
const path = require('path');
const router = require('express').Router();
const db = require('../../db/db.json');

router.get('/notes', (req, res) => {
    res.json(db);
});

router.post('/notes', (req, res) => {
    const note = req.body;
    const notes = db;
    notes.push(note);
    fs.writeFileSync('./db/db.json', JSON.stringify(notes));
    console.log(notes)
    res.json(db);
});

module.exports = router;