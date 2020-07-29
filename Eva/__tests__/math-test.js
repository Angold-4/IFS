const assert = require('assert')

module.exports = eva => {
    assert.strictEqual(eva.eval(['+', ['/', 6, 3], 5]), 7);
    assert.strictEqual(eva.eval(['-', 128, 7]), 121);
    assert.strictEqual(eva.eval(['++', 128]), 129);
}
