'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';

  movements.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}"> ${
      i + 1
    } ${type}</div>
          <div class="movements__value">${mov}</div>
        </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1.movements);

const createUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};

createUserNames(accounts);
console.log(accounts);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// (14-11-2024)
// Simple array methods.................................................................................
/*let arr = ['a', 'b', 'c', 'd', 'e'];

//SLICE method (Not mutate the original array )(also used to create shallow copy)
console.log(arr.slice(2)); // 2 is the index from where it will start extracting the values from array
console.log(arr.slice(2, 4)); // it will start from 2 and end at 4
console.log(arr.slice(-2)); // getting the last two elements from the array
console.log(arr.slice(-1)); // getting the last elements from the array
console.log(arr.slice(1, -2)); // starting from 1st index to 3rd index
console.log(arr.slice()); // we can also create a shallow copy of array using slice method

// SPLICE method(also work same as slice method but it also change the original array )
// console.log(arr.splice(2));
console.log(arr.splice(-1)); // The last element will get extracted
console.log(arr.splice(1, 2)); // b and c will get deleted from the array(from index 1 to 2)
console.log(arr); // The original array will not have the extarcted elements

// Reverse method (this method mutate the original array as well)
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2); // orginal array also mutated

// CONCAT method (does not mutate the original array)
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]); // same as the above concate method

// JOIN method
console.log(letters.join(' - ')); */

// New at method(ES2022)....................................................................................
/*const arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at(0)); // same as the above

// Getting the last element from the array
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);

console.log(arr.at(-1)); // same as the above two
console.log(arr.at(-2));

// The at method also works on strings
console.log('Waleed'.at(0));
console.log('Waleed'.at(-1)); */

// Looping arrays (forEach method).........................................................................

/*const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for (const movement of movements) {
  if(movement > 0)
    console.log(`You deposited ${movement}`);
  else
    console.log(`You withdrew ${Math.abs(movement)}`);
}

// using for each method to achieve the exact same thing above
console.log('---- FOR EACH----');
movements.forEach(function(movement) { // callback function
  if(movement > 0)
    console.log(`You deposited ${movement}`);
  else
    console.log(`You withdrew ${Math.abs(movement)}`);
}) */

// For each on maps and sets........................................................................
// MAP
/*const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function(value, key, map) {
  console.log(`${key}: ${value}`);
})

// SET
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function(value, _, map) {
  console.log(`${value}: ${value}`);
})*/

// Challenge 1..........................................................................
/*const checkDogs = function(dogsJulia, dogsKate) {
  const dogsJuliaCorrected = dogsJulia.slice();
  dogsJuliaCorrected.splice(0, 1);
  dogsJuliaCorrected.splice(-2);

  // console.log(dogsJulia.slice(1, 3)); // also same as the above one
  console.log(dogsJuliaCorrected);

  const dogs = dogsJuliaCorrected.concat(dogsKate);
  console.log(dogs);

  dogs.forEach(function(dog, i) {
    if(dog >= 3)
      console.log(`Dog number ${i + 1} is an adult, and is ${dog} years old`);
    else
      console.log(`Dog number ${i + 1} is still a puppy 🐶`);
  })
  
}

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);*/

// Data Tranformation (map, filter, reduce methods)................................................
//MAP
/*const euroToUSD = 1.1;

// const movementsUSD = movements.map(function(mov) {
//   return mov * euroToUSD;
// });
const movementsUSD = movements.map(mov => mov * euroToUSD); // by using arrow function(but not readable)

console.log(movements);
console.log(movementsUSD);

// Doing the same thing as above by using the for of loop but most preferable is map method
const movementUSDfor = [];
for (const mov of movements) movementUSDfor.push(mov * euroToUSD);
console.log(movementUSDfor);

const movementsDescr = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);

console.log(movementsDescr); */

// Using map and for each method to compute Usernames at the top of the code.....................

// Filter Method........................................................................
const deposits = movements.filter(function(mov) {
  return mov > 0;
})

console.log(movements);
console.log(deposits);

// using for of loop for that
const depositsFOR = [];
for (const mov of movements) if (mov > 0) depositsFOR.push(mov);
console.log(depositsFOR);

// for withdrawls using arrow function
const withdrawls = movements.filter(mov => mov < 0);
console.log(withdrawls);

const withdrawlFOR = [];
for (const mov of movements) if(mov < 0) withdrawlFOR.push(mov);
console.log(withdrawlFOR);