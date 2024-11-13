// Closer Look at the Functions
'use strict';

// (12-11-2024)
// Default Parameters....................................................................
/*const bookings = [];

// Default parameters
const createBooking = function(flightNum, numPassengers = 1, price = 100 * numPassengers) {
    // ES5 (We can do it like above in function arguments which is ES6 feature)
    // numPassengers = numPassengers || 1;
    // price = price || 199;

    const booking = {
        flightNum,
        numPassengers,
        price,
    }
    console.log(booking);
    bookings.push(booking);
}

createBooking('LH123');
createBooking('LH432', 80, 900);
createBooking('LH210', undefined, 3100);
*/

// Pass by value and pass by reference..............................................................
/*const flight = 'LH234';
const Waleed = {
    name: 'Muhammad Waleed',
    passport: 32323882392
}

const checkIn = function(flightNum, passenger) {
    flightNum = 'LH999';
    passenger.name = 'Mr. ' + passenger.name;

    if(passenger.passport === 32323882392){
        alert('Check in')
    }
    else{
        alert('Wrong Passport!')
    }
}

// checkIn(flight, Waleed); // Here the fligh is passed by value and the object is passed by reference
// console.log(flight);
// console.log(Waleed);

// (Example) This function manipulates the passport number as to see that object is passed as a reference here(Non Primitive Datatype)
const newPassport = function(person){
    person.passport = Math.trunc(Math.random() * 1000000000000);
}

newPassport(Waleed);
checkIn(flight, Waleed);

// Javascript have only pass by value not pass by reference */

// First Class and Higher Order Functions................................................................
/*const oneWord = function (str){
    return str.replace(/ /g, '').toLowerCase();
}

const upperFirstWord = function(str) {
    const[first, ...others]  = str.split(' ');
    return [first.toUpperCase(), ...others].join(' ');
}

// Higher Order Functions
const transformer = function(str, fn) {
    console.log(`Original string: ${str}`);
    console.log(`Transformed string: ${fn(str)}`);

    console.log(`Transformed by: ${fn.name}`);
}

// Below the upperFirstWord and oneWord are the call back functions(a function that is passed as an argument to another function)
transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);

// JS uses callbacks all the time
const high5 = function() {
    console.log('👋🏻');
}

document.body.addEventListener('click', high5);

['Waleed', 'Kamran', 'Ali'].forEach(high5);

// Practice Problem(Real World Problem based on Higher Order Functions and callback functions)
const toTitleCase = function (str) {
  return str
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

const toSnakeCase = function(str) {
    return str.replace(/ /g, '_').toLowerCase();
}

const textFormatter = function (str, fn) {
    console.log(`Original string: ${str}`);
    console.log(`Formatted string: ${fn(str)}`);
    console.log(`Formatted by: ${fn.name}`);
}

// callback functions
textFormatter('hello i am muhammad waleed', toTitleCase);
textFormatter('hello i am muhammad waleed', toSnakeCase);*/


// Function Returning Functions.........................................................................
const greet1 = function(greeting) {
    return function(name) {
        console.log(`${greeting} ${name}`);
    };
};

// const greeterHey = greet1('Hey');
// greeterHey('Waleed');
// greeterHey('Kamran');

greet1('Hello')('Ali'); // same as above greeterHey function

// Challenge (Writing the above greet function as arrow function)
const greet2 = greeting => name => console.log(`${greeting} ${name}`);
greet2('Hello')('Faisal');


