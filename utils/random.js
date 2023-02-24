const getRandomInteger = (min, max) => {
  /*
    Math.random() intre 0 si 1
    min = 3
    max = 7
    Sa zicem ca Math.random() genereaza 0.7
    0.7 * (7 - 3 + 1) + 3 = 0.7 * 5 + 3 = Math.floor(3.5) + 3 = 6
  */
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export { getRandomInteger };
