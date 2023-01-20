class AlreadyExistsException extends Error {
  constructor(message) {
    super(message);
  }
}

module.exports = AlreadyExistsException;
