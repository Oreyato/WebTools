// const allow to declare constant variables
const varConst = 5;
console.log(varConst);

// let allows to declare non constant variables 
let hello = "hello"; 
console.log(hello);
hello = "bonjour";
console.log(hello);

const number = Number(prompt("Enter a number"));
if (number > 0) {
    console.log(number + " is positive");
} else {
    console.log(number + " is negative");
}

const otherNumber = 17;
let i = 0;
while (i <= otherNumber) {
    console.log(i);
    i++;
}
console.log("e count until " + otherNumber);

for (let counter = 1; counter <= 5; counter++) {
    console.log(counter);
}

// Declare a function
function sayHello(greetings) {
    console.log(greetings);
}
// Call a function
sayHello("bonjour");

class Person {
    constructor(name, adress, age) {
        // Declare attributes
        this.name = name;
        this.adress = adress;
        this.age = age;
    }

    // Methods are declared without the "function" keyword (that is used outside of classes)
    introduce() {
        console.log("My name is " + this.name + ", I live in " + this.adress + ". I am " + this.age + " years old.")
    }
}

gaetan = new Person("Gaëtan", "Beziers", 33);
gaetan.introduce();
mathieu = new Person("Mathieu", "Montpellier", 35);
brice = new Person("Brice", "Montpellier", 36);

// Arrays
let people = [gaetan, mathieu, brice];

// =========================================
// <WARNING> STRONG DIFFERENCE WITH C++
// =========================================
// let otherList = people;

arthur = new Person("Arthur", "Montpellier", 1200);

// otherList[2] = arthur;

// // The output will be the same
// for (p of people) {
//     p.introduce();
// }
// for (p of otherList) {
//     p.introduce();
// }
// Variables are stored as a reference. If we copy an array in another
// array, we will get the same array in the two variables

// If we want to create an array with the content of the former
const differentList = Array.from(people);
differentList[2] = arthur;

for (p of people) {
    p.introduce();
}
for (p of differentList) {
    p.introduce();
}

// =========================================
// 
// =========================================