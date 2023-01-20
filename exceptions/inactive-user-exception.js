class InactiveUserException extends Error {
  constructor(message) {
    super(message);
  }
}

module.exports = InactiveUserException;
