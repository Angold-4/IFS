const assert = require('assert')

module.exports = eva => {
    assert.strictEqual(eva.eval(
        ['begin',

            ['var', 'counter', 0],

            ['while',
                ['<', 'counter', 10],
                ['set', 'counter', ['++', 'counter']],
            ],
            'counter'
        ]),
    10);
};
