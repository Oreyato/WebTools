const fs = require('fs');

function saveNotes(notes) {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', 'dataJSON');
}

function loadNotes() {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();

        return JSON.parse(dataJSON);
    } catch(e) { // if the first part didn't work ~if notes.json doesn't exist or is badly formatted for example
        return [];
    }
};

function addNote(title, body) {
    const notes = loadNotes();

    // Option to avoid multiple same titles
    const duplicateNotes = notes.filter((note) => {
        return note.title === title;
    });
    if (duplicateNotes.length == 0) {
        notes.push({title: title, body: body});
        saveNotes(notes);
        console.log("New note added");
    } else {
        console.log("A note with this title already exists");
    }
};

function removeNote(title) {
    const notes = loadNotes();

    const notesToKeep = notes.filter((note) => {
        return note.title !== title;
    });
    if (notesToKeep < notes.length) {
        saveNotes(notesToKeep);
        console.log("Note removed");
    } else {
        console.log("There isn't any note named " + title);
    }
};

function listNotes() {
    const notes = loadNotes();

    console.log("NOTES:");
    notes.forEach((note) => {
        console.log(note.title); 
    });
};

function readNote(title) {
    const notes = loadNotes();

    const nodeToRead = notes.find((note) => {
        return note.title === title;
    });
    if (nodeToRead) {
        console.log("Title: " + nodeToRead.title);
        console.log("Body: " + nodeToRead.body);
    } else {
        console.log("There isn't any note named " + title);
    }
};

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};