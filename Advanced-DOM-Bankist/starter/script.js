'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

// Same as above using for each loop
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));


btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// How to select, create and delete elements in javascript...........................................
console.log(document.documentElement); // selecting the entire html body
console.log(document.head); // selecting the head 
console.log(document.body); // selecting the body

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));

// Creating and inserting elements
// .insertAdjacentHTML (way to insert elements programtically)

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookies for improved functionality and analytics.';
message.innerHTML =  'We use cookies for improved functionality and analytics. <button class = "btn btn--close-cookie">Got it!</button>';

// header.prepend(message); // prepend add the element as the first child of the selected element (header)
header.append(message); // append add the elememt as the last child of the selected element (header)
// But here only the one message one will work because there cannot be two duplicate elements in the DOM

// if we want to add multiple same elements in DOM then we need to clone it
// header.append(message.cloneNode(true));

// header.before(message);
// header.after(message);

// Deleting elements
document.querySelector('.btn--close-cookie').addEventListener('click', function() {
  message.remove(); // better way
  // message.parentElement.removeChild(message); // older way
});

// Styles, attributes and classes..................................................................
// STYLES
message.style.backgroundColor = '#37383d'; // these are inline CSS adding to the HTML element directly
message.style.width = '104%';

console.log(message.style.height); // this will show nothing coz height is applioed in external CSS
console.log(message.style.backgroundColor); // this will show coz background color is applied inline using JS

//now if we really want to access the external style then we will use the compute function
console.log(getComputedStyle(message).height);

// if we want to change the hieght programtically then
message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';