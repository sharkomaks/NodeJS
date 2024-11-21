const {PerformanceObserver} = require('perf_hooks');
const {Worker} = require('worker_threads');
const {splitArray} = require('./splitArray');
const {filter} = require('./filter');

const length = 40000000;
const arr = new Array(length).fill(0).map((_, i) => i + 1);

const performanceObserver = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
        console.log(`${entry.name}: ${entry.duration}`);
    });
});
performanceObserver.observe({type: 'measure'});

const linear = (array) => {
    performance.mark('linear-start');
    console.log(`linear-count: ${filter(array).length}`);
    performance.mark('linear-end');
    performance.measure('linear', 'linear-start', 'linear-end');
};

const worker = async (array) => {
    performance.mark('worker-start');
    const newArray = splitArray(array, 8);
    let result = 0;

    const promises = newArray.map((a, i) => {
        return new Promise((resolve) => {
            performance.mark(`worker-thread-${i + 1}-start`);
            const worker = new Worker('./worker.js', {
                workerData: a
            });
            worker.on('message', (msg) => {
                performance.mark(`worker-thread-${i + 1}-end`);
                performance.measure(`worker-thread-${i + 1}`,
                    `worker-thread-${i + 1}-start`,
                    `worker-thread-${i + 1}-end`);
                resolve(result += msg.length);
            });
        });
    });

    await Promise.all(promises);
    console.log(`worker-count: ${result}`);
    performance.mark('worker-end');
    performance.measure('worker', 'worker-start', 'worker-end');
};

const main = async () => {
    await worker(arr);
    linear(arr);
};

main();

// Вывод в консоли
// worker-count: 13333333
// linear-count: 13333333
// worker: 1700.257200000001
// worker-thread-1: 660.2623999999996
// worker-thread-2: 743.7974999999997
// worker-thread-3: 833.4822000000004
// worker-thread-4: 894.8697000000011
// worker-thread-5: 956.1485000000002
// worker-thread-6: 1012.1193000000003
// worker-thread-7: 1063.0999999999995
// worker-thread-8: 1113.9639000000006
// linear: 418.3805000000011