// Loads a <LOCAL> module and stores it in a variable
// const utils = require('./utils');

// console.log(utils.name);
// const sum = utils.add(9, 15);
// console.log(sum);

// ==========================================

// An alternative, simpler version
const {name, add} = require('./utils');

// User personal modules
console.log(name);
const sum = add(9, 15);
console.log(sum)

// ==========================================

// Loads external modules
const validator = require('validator');
const chalk = require('chalk');

// String validation with validator
console.log(validator.isEmail('gaetz@rufflerim.com'));
console.log(validator.isURL('http:/rufflerm.com'));

// Console color with chalk
console.log(chalk.blue.bgGreen.bold('success'));
console.log(chalk.green.inverse.bold('other success'));
console.log(chalk.red('fail'));