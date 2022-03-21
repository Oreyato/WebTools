console.log("Utils loaded");
const name = 'Gaetan';
// Create a function
const add = function(a, b) {
    return a + b;
};

// Export variables name and add it into a javascript object
module.exports = {name, add};