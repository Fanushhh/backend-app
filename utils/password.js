const { getRandomInteger } = require("./random");
const bcrypt = require("bcrypt");

const generatePasswordHash = async (password) =>
  await bcrypt.hash(password, 10);

const generateRandomPassword = () => {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const randomLength = getRandomInteger(8, 30);

  let password = "";
  let randomNumber;
  for (let i = 0; i < randomLength; i++) {
    randomNumber = getRandomInteger(0, chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }

  return password;
};

module.exports = { generatePasswordHash, generateRandomPassword };
