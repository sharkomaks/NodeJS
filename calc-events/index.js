const EventEmitter = require('events');
const add = require('./add');
const subtract = require('./subtract');
const multiply = require('./multiply');
const divide = require('./divide');

const myEmitter = new EventEmitter;
const firstNum = Number(process.argv[2]);
const secondNum = Number(process.argv[3]);
const operation = process.argv[4];
const operations = ['add', 'subtract', 'multiply', 'divide'];

if (isNaN(firstNum) || isNaN(secondNum)) {
    console.log('Пожалуйста, укажите два числа в качестве первых аргументов');
    return;
}

if (!operations.includes(operation)) {
    console.log(`Пожалуйста, укажите операцию из списка ${operations.join(', ')}`);
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