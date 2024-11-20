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
          <div class="movements__type movements__type--${type}"> ${i + 1} ${type}</div>
          <div class="movements__value">${mov}$</div>
        </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function(acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = `${acc.balance} $`;
};

const calcDisplaySummary = function(acc) {
  const incomes = acc.movements
  .filter(mov => mov > 0)
  .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes} $`;

  const out = acc.movements
  .filter(mov => mov < 0)
  .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)} $`;

  const interest = acc.movements.filter(mov => mov > 0)
  .map(deposit => deposit * acc.interestRate/100)
  .reduce((acc, int) => acc + int, 0);

  labelSumInterest.textContent = `${interest} $`;
};

// For each function.....
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
// console.log(accounts);

const updateUI = function(acc) {
  // Display Movements
  displayMovements(acc.movements);
  // Display balance
  calcDisplayBalance(acc);
  // Display summary
  calcDisplaySummary(acc);
}

// Event Handelers
let currentAccount;

btnLogin.addEventListener('click', function(e) {
  // Prevent form from submitting(in HTML)
  e.preventDefault();

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  console.log(currentAccount);

  if(currentAccount?.pin === Number(inputLoginPin.value)) { // Here optional chaining'?' is used instead of &&
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    // clear the input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // update
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function(e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  
  inputTransferAmount.value = inputTransferTo.value = '';

  // here we used optional chaining, if the user account doesn't exist so it will be undefined and if exist then other condition will be checked
  if(amount > 0 && recieverAcc && currentAccount.balance >= amount && recieverAcc?.username !== currentAccount.username) {
    // doing the transfer
    currentAccount.movements.push(-amount);
    recieverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function(e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if(amount > 0 && currentAccount.movements.some(mov => mov >= amount*0.1)) // 10%
  {
    // Add movement
    currentAccount.movements.push(amount);

    // Update the UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

// Closing account
btnClose.addEventListener('click', function(e) {
  e.preventDefault();

  if(inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin)
  {
    const index = accounts.findIndex(acc => acc.username === currentAccount.username);
    console.log(index);
    accounts.splice(index, 1);

    // Hide UI after deleting the account
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});
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
/*const deposits = movements.filter(function(mov) {
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
console.log(withdrawlFOR); */

// Reduce Method......................................................................
/*console.log(movements);

// accumulator is like a snowball
// const balance = movements.reduce(function(acc, curr, i, arr) {
//   console.log(`Iteration ${i}: ${acc}`);
//   return acc + curr;
// }, 0); // here 0 is the initial value of accumulator"acc"

// By using the arrow function
const balance = movements.reduce((acc, curr) => acc + curr, 0);
console.log(balance);

// doing the above same thing using for loop
let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

// We can also do other things using reduce method
// Maximum value in movements array
const max = movements.reduce((acc, mov) => {
  if(acc > mov)
    return acc;
  else
    return mov;
}, movements[0]);// the initial value of accumualtor is the first element of array
console.log(max);*/


// Coding Challenge 2
/*const calcAverageHumanAge = function(ages) {
  // 1. calculating human ages based on dogs ages by creating new shallow array using map methos
  const humanAges = ages.map(age => age <= 2 ? 2 * age : 16 + age * 4);
  
  // 2. Excluding dogs that are less than 18 human years old using filter method
  const adults = humanAges.filter(age => age>=18)
  console.log(humanAges);
  console.log(adults);

  // 3. Calculating average
  const average = adults.reduce((acc, age) => acc + age, 0) / adults.length;
  return average;
}

const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
console.log(avg1); */

// Chaining method (using the filter, map and reduce method all in once)
// Example converting the movements array elements from euro to usd
/*const euroToUSD = 1.1;
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * euroToUSD)
  .reduce((acc, mov) => acc + mov, 0);

console.log(totalDepositsUSD);*/

// Find method (used to find one element)..........................................................................
/*const firstWithdrawl = movements.find(mov => mov < 0);

console.log(movements);
console.log(firstWithdrawl);

// Best use case of find method on objects
console.log(accounts);

// finding the object with the owner name Jessica Davis
const accountt = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(accountt);

// doing the above same thing using for of loop
let account = null;
for(const acc of accounts) {
  if(acc.owner === 'Jessica Davis'){
    account = acc;
    break;
  } 
}
console.log(account); */

console.log(movements);
// checks only for equality...........................................................................
console.log(movements.includes(-130)); // used to check the value is present in array or not
console.log(movements.some(mov => mov === -130));

// SOME condition: here we give the condition
const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits);

// EVERY condition: returns true if all the elements satisfies the condition
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

// Separate callback
const deposit = mov => mov> 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

// The flat and flat map methods.........................................................................
const arr = [[1,2,3], [4,5,6], 7, 8];
console.log(arr.flat()); // removes the nested array and print the array elements

const arrDeep = [[[1,2],3], [4, [5, 6], 7, 8]];
console.log(arrDeep.flat(2)); // here 2 is the depth of array nesting(by default is 1)

// const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);
// const allMovements = accountMovements.flat();
// console.log(allMovements);

// const overallBalance = allMovements.reduce((acc, mov ) => acc + mov , 0);
// console.log(overallBalance);

// we can do the all the above mess by using flat and Optional Chaining
const overallBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);

// flatMap function combines flat and map function for better performance
// but here if we want to go deeper in the nested array so flatMap will not work we will use flat method
const overallBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);