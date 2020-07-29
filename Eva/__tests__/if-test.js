const assert = require('assert')

module.exports = eva => {
    assert.strictEqual(eva.eval(
        ['begin',
            ['var', 'x', 9],
            ['var', 'y', 0],

            ['if', ['>', 'x', 10],
                ['set', 'y', 30],
                ['set', 'y', 20],
            ],
            'y'
        ]),
    20);
};
