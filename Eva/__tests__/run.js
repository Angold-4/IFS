const Eva = require('../Eva');
const Environment = require('../Environment');

const tests = [
    require('./self-eval-test.js'),
    require('./block-test.js'),
    require('./math-test.js'),
    require('./variables-test.js'),
    //require('./if-test.js'),
    //require('./compare-test.js'),
    //require('./while-test.js'),
    //require('./for-test.js'),
];

const eva = new Eva(new Environment({
    /**
     * Pre-installed Value
     */
    Null: null,
    True: true,
    False: false,
    VERSION: '0.1',
}));

tests.forEach(test => test(eva));

console.log('All assersions passed!');
