const {parentPort, workerData} = require('worker_threads');
const {filter} = require('./filter');

parentPort.postMessage(filter(workerData));