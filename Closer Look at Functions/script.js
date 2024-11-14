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
/*const greet1 = function(greeting) {
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
greet2('Hello')('Faisal'); */

// (13-11-2024)
// The call and apply method.............................................................................
/*const PIA = {
    airline: 'PIA',
    code: 'LH',
    bookings: [],
    // book: function() {}
    book(flightNum, name) { // same as above
        console.log(`${name} booked a seat on ${this.airline} flight ${this.code}${flightNum}`);
        this.bookings.push({flight: `${this.code}${flightNum}`, name});
    },
    
};

PIA.book(239, 'Waleed');
PIA.book(347, 'Sabir');
console.log(PIA.bookings);

// Suppose after some time PIA created a new airline
const pWings = {
    airline: 'pWings',
    code: 'PW',
    bookings: [],
};

const book = PIA.book; // book function

// book(23, 'Sabir Sultan'); does not work

// call method usage
book.call(pWings, 23, 'Sabir Sultan');
console.log(pWings);

book.call(PIA, 238, 'Badar Jamal');
console.log(PIA);

const swiss = {
    airline: 'Swiss Air Line',
    code: 'LX',
    bookings: []
}

book.call(swiss, 583, 'Sabir Sultan');
console.log(swiss);

// Apply method(same as call method but it does not get the elements as a list but as an array and then pass it to the objects)
// It is not that much used in modern javascript
const flightData = [573, 'Basit'];
book.apply(swiss, flightData);
console.log(swiss);

// The more useful way is to use call method with spread operator in modern javascript
book.call(swiss, ...flightData); */

// Immediately invoked functions expressions..............................................
// Ordinary Function
/*const temp = 23;
const runOnce = function() {
    console.log('This will never run again');
    console.log(temp);
}
runOnce();

// IIFE
(function() {
    console.log('This will never run again');
    console.log(temp);
})();

// also works for an arrow function 
(() => console.log('This will ALSO never run again'))();
((name) => console.log(`This will ALSO never run again ${name}`))('Waleed'); */


// (14-11-2024)
// Clousers............................................
const secureBooking = function() {
    let passengerCount = 0;

    return function() {
        passengerCount++;
        console.log(`${passengerCount} passengers`);
    };
};

const booker = secureBooking();

booker();
booker();
booker();

console.dir(booker);

// More Closure examples
// Example 1: (Clousers also work even we are not returning any function)
let f;

const g = function() {
    const a = 23;
    f = function() {
        console.log(a * 2);
    }
}

const h = function() {
    const  b = 777;
    f = function() {
        console.log(b * 2);
    }
}

g();
f();
console.dir(f);
// Reassigning f function
h();
f();

console.dir(f);

// Example 2: (Timer)
const boardPassengers = function(n, wait) {
    const perGroup = n / 3;

    setTimeout(function(){
        console.log(`We are now boarding all ${n} passengers`);
        console.log(`There are 3 groups each with ${perGroup} passengers`);
    }, wait * 1000);

    console.log(`Will start boarding in ${wait} seconds`);
};

boardPassengers(180, 3);

// Coding Challenge
(function () {
    const header = document.querySelector('h1');
    header.style.color = 'red';

    document.querySelector('body').addEventListener('click', function(){
        header.style.color = 'blue';
    })
}) ();