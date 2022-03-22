const yargs = require('yargs');
const validator = require('validator');
// const chalk = require('chalk');
const fs = require('fs');
const notes = require('./notes');

yargs.command('add', 'Add a note', 
    {
        title: { describe: 'Note title', demandOption: true, type: 'string'},
        body: { describe: 'Note body', demandOption: true, type: 'string'}
    }, 
    (argv) => {
        notes.addNote(argv.title, argv.body);
    }
);

yargs.command('remove', 'Remove a note', 
    {
        title: { describe: 'Note title', demandOption: true, type: 'string'}
    }, 
    (argv) => {
        notes.removeNote(argv.title);
    }
);

yargs.command('read', 'Read a note', 
    {
        title: { describe: 'Note title', demandOption: true, type: 'string'}
    }, 
    (argv) => {
        notes.readNote(argv.title);
    }
);

yargs.command('list', 'List notes', {}, () => {
    console.log("List notes");
});
