const splitArray = (array, parts) => {
    const result = [];
    const partSize = array.length / parts;
    for (let i = 0; i < parts; i++) {
        const start = i * partSize;
        const end = start + partSize;
        result.push(array.slice(start, end));
    }
    return result;
};

module.exports = {splitArray};