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


