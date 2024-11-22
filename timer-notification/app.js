const notifier = require('node-notifier');
const hours = parseInt(process.argv[2]) || 0;
const minutes = parseInt(process.argv[3]) || 0;
const seconds = parseInt(process.argv[4]) || 0;
let time;

if (hours < 0 || minutes < 0 || seconds < 0) {
    console.log('Пожалуйста, укажите корректные значения для часов, минут и секунд.');
} else {
    time = (hours * 60 * 60) + (minutes * 60) + seconds;

    setTimeout(() => {
        notifier.notify({
            title: 'Таймер',
            message: 'Время вышло'
        });
        console.log('Время вышло');
    }, time * 1000);
}