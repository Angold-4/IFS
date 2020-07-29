const assert = require('assert')

module.exports = eva => {
    assert.strictEqual(eva.eval(
        ['begin',

            ['var', 'x', 10],
            ['var', 'y', 20],

            ['+', ['*', 'x', 'y'], 30],

        ]),
    230);

    /**
     * Nest Enviroment
     */
    assert.strictEqual(eva.eval(
        ['begin',
            ['var', 'x', 10],
            ['begin',
                ['var', 'x', 20],
                'x'
            ],
            'x'
        ]),
    10);

    /**
     * Parent Enviroment
     */
    assert.strictEqual(eva.eval(
        ['begin',
            ['var', 'value', 10],
            ['var', 'result', ['begin',
                ['var', 'x', ['+', 'value', 10],
                ],
                'x'
            ]],
            'result'
        ]),

    20);

    assert.strictEqual(eva.eval(
        ['begin',
            ['var', 'value', 10],
            ['begin',
                ['set', 'value', 100],
            ], 'value'
        ]),
    100);
}
