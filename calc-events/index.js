const EventEmitter = require('events');
const add = require('./add');
const subtract = require('./subtract');
const multiply = require('./multiply');
const divide = require('./divide');

const myEmitter = new EventEmitter;
let firstNum = Number(process.argv[2]);
let secondNum = Number(process.argv[3]);
let operation = process.argv[4];

if (isNaN(firstNum) || isNaN(secondNum)) {
    console.log('Пожалуйста, укажите два числа в качестве первых аргументов');
    return;
}

myEmitter.on('add', (a, b) => {
    add(a, b);
});

myEmitter.on('subtract', (a, b) => {
    subtract(a, b);
});

myEmitter.on('multiply', (a, b) => {
    multiply(a, b);
});

myEmitter.on('divide', (a, b) => {
    divide(a, b);
});

myEmitter.emit(operation, firstNum, secondNum);