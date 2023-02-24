export const NAME_ERRORS = Object.freeze({
  REQUIRED: "Prenumele este obligatoriu",
  MIN_LENGTH: "Prenumele trebuie sa aiba minim 2 litere",
  MAX_LENGTH: "Prenumele trebuie sa aiba maxim 30 litere",
  ONLY_LETTERS: "Prenumele trebuie sa contina doar litere",
  ONLY_SPACES: "Prenumele nu poate contine doar spatii",
});

export const EMAIL_ERRORS = Object.freeze({
  REQUIRED: "Email-ul este obligatoriu",
  MIN_LENGTH: "Email-ul trebuie sa aiba minim 6 caractere",
  MAX_LENGTH: "Email-ul trebuie sa aiba maxim 100 caractere",
  ONLY_SPACES: "Email-ul nu poate contine doar spatii",
  INVALID: "Email-ul nu este valid",
});

export const PASSWORD_ERRORS = Object.freeze({
  REQUIRED: "Parola este obligatorie",
  MIN_LENGTH: "Parola trebuie sa aiba minim 6 caractere",
  MAX_LENGTH: "Parola trebuie sa aiba maxim 30 caractere",
  ONLY_SPACES: "Parola nu poate contine doar spatii",
  LOWERCASE_LETTER: "Parola trebuie sa contina macar o litera mica",
  UPPERCASE_LETTER: "Parola trebuie sa contina macar o litera mare",
  DIGIT: "Parola trebuie sa contina macar o cifra",
});

export const PASSWORDS_NOT_THE_SAME = "Parolele nu coincid";