const fs = require('fs');
const path = require('path');

function findById(id, noteArray) {
  const result = noteArray.filter(note => note.id === id)[0];
  return result;
}

function createNewNote(body, noteArray) {
  const note = body;
  noteArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, '../db/db.json'),
    JSON.stringify({ noteArray }, null, 2)
  );
  return note;
}

module.exports = {
  findById,
  createNewNote,
}