const assert = require('assert')

module.exports = eva => {
    assert.strictEqual(eva.eval('>=', 10, 5), ('>', 12, 8));
}
