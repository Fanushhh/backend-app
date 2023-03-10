import { generateAuthToken, generateActivateToken } from "../../utils/token.js";
import { generatePasswordHash } from "../../utils/password.js";
import { getCookieExpireDate } from "../../utils/date.js";
import { InactiveUserException } from "../../exceptions/inactive-user-exception.js";
import { AlreadyExistsException } from "../../exceptions/already-exists-exception.js";
import { MissingFieldException } from "../../exceptions/missing-field-exception.js";
import { sendEmail } from "../../utils/email.js";
import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import User from "../../models/user.js";
import PendingUser from "../../models/pending-user.js";
import UnauthorizedAccessException from "../../exceptions/unauthorized-access-exception.js";
import UserType from "../../models/user-type.js";
import UserToken from "../../models/user-token.js";

const router = Router();

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
    // Question : Mai avem nevoie de validarea de mai sus daca facem deja form input validation in register.js, gen inainte sa facem form-submit ( stiu ca ai mentionat ceva ca parca exista metode de a pacalii form-ul si sa dai submit fara sa ai date puse dar nu mai tin minte exact care era faza)

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

    console.log(
      `https://code-learn-v1.herokuapp.com/templates/activate.html?token=${token}`
    );

    sendEmail(
      [email],
      `[${process.env.MAIL_APP}] User activation`,
      `For activation of your user account, you need to access the following link https://code-learn-v1.herokuapp.com/templates/activate.html?token=${token}`
    );

    const hashedPassword = await generatePasswordHash(password);

    let userTypeClient = await UserType.findOne({ name: "client" });

    if (!userTypeClient) {
      const newUserType = new UserType({ name: "client" });
      userTypeClient = await newUserType.save();
    }

    const newPendingUser = new PendingUser({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      token,
      userTypeId: userTypeClient._id,
    });

    await newPendingUser.save();

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

    if (!email)
      throw new MissingFieldException(
        "Campul email lipseste din corpul cererii!"
      );

    if (!password)
      throw new MissingFieldException(
        "Campul password lipseste din corpul cererii!"
      );

    const pendingUser = await PendingUser.findOne({ email });

    if (pendingUser)
      throw new InactiveUserException("Email-ul nu este activat!");

    const user = await User.findOne({ email });

    if (!user)
      throw new NoEntityFoundException("Nu exista niciun user cu acest email!");

    if (!(await bcrypt.compare(password, user.password)))
      throw new UnauthorizedAccessException("Parola invalida!");

    const token = generateAuthToken(user.id);
    console.log(token);
    const newUserToken = new UserToken({
      userId: user._id,
      expireDate: getCookieExpireDate({ days: 7 }),
      token,
    });

    await newUserToken.save();

    res.cookie("accessToken", JSON.stringify(token), {
      secure: true,
      httpOnly: true,
      expires: getCookieExpireDate({ weeks: 1 }),
    });

    res.json({
      message: "Te-ai autentificat cu succes",
      severity: "success",
      user: user,
    });
  })
);

router.post(
  "/activate",
  asyncHandler(async (req, res) => {
    const { token } = req.body;

    if (!token)
      throw new MissingFieldException(
        "Campul token lipseste din corpul cererii!"
      );

    const pendingUser = await PendingUser.findOne({ token });

    if (!pendingUser)
      throw new InvalidTokenException("Token-ul nu este valid!");

    jwt.verify(token, process.env.JWT_ACTIVATE_TOKEN_SECRET);

    const { firstName, lastName, email, password, userTypeId } =
      pendingUser.toObject();

    const user = new User({ firstName, lastName, email, password, userTypeId });

    await user.save();

    pendingUser.delete();

    res.json({
      message: "The account has been activated, you can login now!",
      severity: "success",
    });
  })
);

export default router;
