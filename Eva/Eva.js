const assert = require('assert');
const Environment = require('./Environment');

/*
 * Eva Interpreter
 */

class Eva {
    /**
     * Creates an Eva instance with the global enviroment
     */
    constructor(global = new Environment()){
        this.global = global
    }

    eval(exp, env = this.global) {
        /**
         * Evaluate Expression
         */
        if (isNumber(exp)){
            return exp;
        }
        if (isString(exp)){
            return exp.slice(1, -1);
        }
        // -----------------------------------------------------------
        // Variable opration

        if (exp[0] === "+"){
            return this.eval(exp[1], env) + this.eval(exp[2], env);
        }

        if (exp[0] === "-"){
            return this.eval(exp[1], env) - this.eval(exp[2], env);
        }

        if (exp[0] === "*"){
            return this.eval(exp[1], env) * this.eval(exp[2], env);
        }

        if (exp[0] === "/"){
            return this.eval(exp[1], env) / this.eval(exp[2], env);
        }

        if (exp[0] === "++"){
            return this.eval(exp[1], env) + 1;
        }

        // -----------------------------------------------------------
        // Comparison opration

        if (exp[0] === ">"){
            return this.eval(exp[1], env) > this.eval[exp[2], env];
        }

        if (exp[0] === ">="){
            return this.eval(exp[1], env) >= this.eval[exp[2], env];
        }

        if (exp[0] === "<"){
            return this.eval(exp[1], env) < this.eval[exp[2], env];
        }

        if (exp[0] === "<="){
            return this.eval(exp[1], env) <= this.eval[exp[2], env];
        }

        if (exp[0] === "="){
            return this.eval(exp[1], env) === this.eval[exp[2], env];
        }

        // -----------------------------------------------------------
        // Variable declaration: (var foo 100)

        if (exp[0] === 'var'){
            const [first, name, value] = exp;
            return env.define(name, this.eval(value, env))
        }

        // -----------------------------------------------------------
        // Variable update: (set foo 100)

        if (exp[0] === 'set'){
            const [first, name, value] = exp;
            return env.assign(name, this.eval(value, env))
        }

        if (isVariableName(exp)){
            return env.lookup(exp)
        }

        // -----------------------------------------------------------
        // Block expression

        if (exp[0] === 'begin'){
            const blockEnv = new Environment({}, env);
            return this._evalBlock(exp, blockEnv);
        }

        // -----------------------------------------------------------
        // if expression

        if (exp[0] === 'if'){
            const [first, condition, consequent, alternate] = exp;
            if (this.eval(condition, env)){
                return this.eval(consequent, env);
            }
            return this.eval(alternate, env);
        }

        // -----------------------------------------------------------
        // while expression

        if (exp[0] === 'while'){
            const [_tag, condition, body] = exp;
            let result;
            while (this.eval(condition, env)){
                result = this.eval(body, env);
            }
            return result;
        }


        // -----------------------------------------------------------
        // for expression

        if (exp[0] === 'for'){
            const [first, def, condition, iter, body] = exp;
            let result;
            for (this.eval(def, env); this.eval(condition, env); this.eval(iter, env)){
                result = this.eval(body, env);
            }
            return result;
        }

        throw `unimplemented: ${JSON.stringify(exp)}`;
    }

    _evalBlock(block, env) {
        let result;

        const [first, ...expressions] = block; /* ... is spread opration (only for iterible obj) */

        expressions.forEach(exp => { /* for each as exp */
            result = this.eval(exp, env);
        });
        return result;
    }

}

// -----------------------------------------------------------
// variable or string or number access

function isNumber(exp) {
    return typeof exp === 'number';
}

function isString(exp) {
    return typeof exp === 'string' && exp[0] === '"' && exp.slice(-1) === '"';
}

function isVariableName(exp) {
    return typeof exp === 'string' && /^[a-zA-Z][a-zA-Z0-9_]*$/.test(exp);
}

module.exports = Eva
