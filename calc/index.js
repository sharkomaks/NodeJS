const add = require('./add');
const subtract = require('./subtract');
const multiply = require('./multiply');
const divide = require('./divide');

// let nodePath = process.argv[0];
// let appPath = process.argv[1];
let firstNum = Number(process.argv[2]);
let secondNum = Number(process.argv[3]);
let operation = process.argv[4];

if (isNaN(firstNum) || isNaN(secondNum)) {
    console.log('Пожалуйста, укажите два числа в качестве первых аргументов');
    return;
}

switch (operation) {
    case '+':
    case 'add':
        add(firstNum, secondNum);
        break;
    case '-':
    case 'subtract':
        subtract(firstNum, secondNum);
        break;
    case '*':
    case 'multiply':
        multiply(firstNum, secondNum);
        break;
    case '/':
    case 'divide':
        divide(firstNum, secondNum);
        break;
    default:
        console.log('Неизвестная операция. Используйте add или +, subtract или -, multiply или *, divide или /');
}