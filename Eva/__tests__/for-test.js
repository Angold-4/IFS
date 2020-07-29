const assert = require('assert')

module.exports = eva => {
    assert.strictEqual(eva.eval(
        ['begin'

            ['var', 'result', 0],

            ['for', ['var', 'counter', 0], ['<', 'counter', 20], ['++', 'counter'],
                ['set', 'result', ['+', 'result', 2]]
            ],
            'result'
        ]),
    20);
}
