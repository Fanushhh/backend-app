const { generatePasswordHash } = require("../utils/password");
const { generateActivateToken } = require("../utils/token");
const { sendEmail } = require("../utils/email");
const asyncHandler = require("express-async-handler");
const express = require("express");
const User = require("../models/user.model");
const PendingUser = require("../models/pending-user.model");
const MissingFieldException = require("../exceptions/missing-field-exception");
const NoEntityFoundException = require("../exceptions/no-entity-found-exception");
const UnauthorizedAccessException = require("../exceptions/unauthorized-access-exception");
const InactiveUserException = require("../exceptions/inactive-user-exception");
const AlreadyExistsException = require("../exceptions/already-exists-exception");
const UserType = require("../models/user-type.model");

const router = express.Router();

router.post(
  "/register",
  asyncHandler(async function (req, res) {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName) {
      throw new MissingFieldException(
        "Campul firstName lipseste din corpul cererii!"
      );
    }

    if (!lastName) {
      throw new MissingFieldException(
        "Campul lastName lipseste din corpul cererii!"
      );
    }

    if (!email) {
      throw new MissingFieldException(
        "Campul email lipseste din corpul cererii!"
      );
    }

    if (!password) {
      throw new MissingFieldException(
        "Campul password lipseste din corpul cererii!"
      );
    }

    const pendingUser = PendingUser.findOne({ email });

    if (pendingUser) {
      new InactiveUserException(
        "User registration still pending, activate acount!"
      );
    }

    const user = User.findOne({ email });

    if (user) {
      new AlreadyExistsException("An user already exists with this email!");
    }

    const token = generateActivateToken(email);

    console.log(`http://127.0.0.1:5000/templates/activate.html?token=${token}`);

    sendEmail(
      [email],
      `[${process.env.MAIL_APP}] User activation`,
      `For activation of your user account, you need to access the following link http://127.0.0.1:5000/templates/activate.html?token=${token}`
    );

    // const hashedPassword = await generatePasswordHash(password);

    // let userTypeClient = await UserType.findOne({ name: "client" });

    // if (!userTypeClient) {
    //   const newUserType = new UserType({ name: "client" });
    //   userTypeClient = await newUserType.save();
    // }

    // const newPendingUser = new PendingUser({
    //   firstName,
    //   lastName,
    //   email,
    //   password: hashedPassword,
    //   token,
    //   userTypeId: userTypeClient._id,
    // });

    // await newPendingUser.save();

    res.json({
      message: "You registered successfully, open email to active the account!",
      severity: "info",
    });
  })
);



router.post(
  "/login",
  asyncHandler(async function (req, res) {
    const { email, password } = req.body;

    if (!email) {
      throw new MissingFieldException(
        "Campul email lipseste din corpul cererii!"
      );
    }

    if (!password) {
      throw new MissingFieldException(
        "Campul password lipseste din corpul cererii!"
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new NoEntityFoundException("Nu exista niciun user cu acest email!");
    }

    if (user.password !== password) {
      throw new UnauthorizedAccessException("Parola invalida!");
    }

    res.json({
      message: "Te-ai autentificat cu succes",
      severity: "success",
    });
  })
);

module.exports = router;
