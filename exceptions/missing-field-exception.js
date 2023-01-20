class MissingFieldException extends Error {
    constructor(message) {
        super(message);
    }
}

module.exports = MissingFieldException;