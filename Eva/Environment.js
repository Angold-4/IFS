class Environment {
    /**
     * Creates an Enviroment with the given record
     */

    constructor(record = {}, parent = null){
        this.record = record;
        this.parent = parent;
    }

    /**
     * Creates a variable with the given name and value
     */

    define(name, value){
        this.record[name] = value;
        return value;
    }

    assign(name, value){
        this.resolve(name).record[name] = value;
    }

    lookup(name) {
        return this.resolve(name).record[name];
    }

    resolve(name) {
        if (this.record.hasOwnProperty(name)){
            return this;
        }

        if (this.parent == null){
            throw new ReferenceError(`Variable "${name}" is not defined.`);
        }

        return this.parent.resolve(name);
    }
}
module.exports = Environment;
