const express = require('express');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// app.use('/api', apiRoutes);
// app.use('/', htmlRoutes);


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  let db = fs.readFileSync('./db/db.json');
  db = JSON.parse(db);
  res.json(db);
});

app.post('/api/notes', (req, res) => {
  let newNote = {
    title: req.body.title,
    description: req.body.description,
    id: uuidv4()
  };
  let db = fs.readFileSync('./db/db.json'); 
  db = JSON.parse(db);
  db.push(newNote);
  db = JSON.stringify(db);
  fs.writeFileSync('./db/db.json', db);
  res.json(db);
});

app.delete('/api/notes/:id', (req, res) => {
  let db = fs.readFileSync('./db/db.json');
  db = JSON.parse(db);
  db = db.filter((note) => note.id !== req.params.id);
  db = JSON.stringify(db);
  fs.writeFileSync('./db/db.json', db);
  res.json(db);
});


app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});