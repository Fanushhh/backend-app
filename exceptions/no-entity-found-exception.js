class NoEntityFoundException extends Error {
    constructor(message) {
        super(message);
    }
}

module.exports = NoEntityFoundException;