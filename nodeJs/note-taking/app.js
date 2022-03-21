// We will be using yargs that handles command line instructions
const yargs = require('yargs');
const command = process.argv[2];

// function addNote() {
//     console.log('Added a note');
// }

// Command function: 4 parameters ================================
// 1. the command ('add')                                        
// 2. documentation of the command (what it is used for)     
//       Write "node app.js --help" to display the documentation     
// 3. javascript object that gives constraints to the command     
// 4. a function to execute when the command is parsed ===========
/*
yargs.command('add', 'Add a note', {}, addNote);
// Because we only use addNote inside the yargs command, 
// we will use an anonymous function instead 
yargs.command('add', 'Add a note', {}, function() {
    console.log("Added a note");
});
*/
// Alternative (and quicker) way to write anonymous functions (named "arrow notation")
yargs.command('template', 'command description', {/*Instructions to yargs*/}, (/*WE CAN WRITE ARGUMENTS HERE IF NEEDED*/) => {
    console.log("Command description");
});
yargs.command('add', 'Add a note', {
    title: { describe: 'Note title', demandOption: true, type: 'string'},
    body: { describe: 'Note body', demandOption: true, type: 'string'}
    }, 
    (argv) => {
        console.log("Title: ", argv.title);
        console.log("Body: " , argv.body);
    }
); // node app.js add --title="Things to buy" --body="ice cream, spinach"
yargs.command('remove', 'Remove a note', {}, () => {
    console.log("Removed a note");
});
yargs.command('read', 'Read a note', {}, () => {
    console.log("Read a note");
});
yargs.command('list', 'List notes', {}, () => {
    console.log("List notes");
});

yargs.parse();

if (command === 'add') { // Triple equal checks the type in addition to the value
    console.log('Adding note');
} else if (command === 'remove') {
    console.log('Remove note');
}

