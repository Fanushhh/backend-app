export const checkMinLength = (string, min) => string.length >= min;

export const checkMaxLength = (string, max) => string.length <= max;

export const checkValidEmail = (email) => email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)

export const checkAllLetters = (string) => string.match(/^[A-Za-z]+$/)

export const checkOnlySpaces = (string) => string.length > 0 && string.trim().length === 0

export const checkIsEmpty = (string) => string.length === 0