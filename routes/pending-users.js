const asyncHandler = require("express-async-handler");
const express = require("express");
const router = express.Router();
const PendingUser = require("../models/pending-user.model");

router.get(
  "",
  asyncHandler(async function (_req, res) {
    const pendingUsers = await PendingUser.find();
    res.json(pendingUsers);
  })
);

router.get(
  "/:id",
  asyncHandler(async function (req, res) {
    const user = await PendingUser.findById(req.params.id);
    try {
      if (!user) {
        res.status(404);
        res.json({
          message: `There is no user with id ${req.params.id}`,
          severity: "error",
        });
      } else {
        res.json(user);
      }
    } catch {
      res.status = 500;
      res.json({ error: error.message, severity: "error" });
    }
  })
);

router.post(
  "",
  asyncHandler(async function (req, res) {
    if (Array.isArray(req.body)) {
      for (const userData of req.body) {
        const { firstName, lastName, email, password } = userData;
        const user = await User.findOne({ email });

        if (user) {
          res.status(409);
          res.json({
            message: `Exista deja un user cu email-ul ${email}`,
            severity: "error",
          });
          break;
        } else {
          const newUser = new User({
            firstName,
            lastName,
            email,
            password,
          });
          await newUser.save();
        }
      }
      res.json({
        message: `Users were created successfully!`,
        severity: "success",
      });
    } else {
      const { firstName, lastName, email, password } = req.body;
      const user = await User.findOne({ email });

      if (user) {
        res.status(409);
        res.json({
          message: `Exista deja un user cu email-ul ${email}`,
          severity: "error",
        });
      } else {
        const newUser = new User({
          firstName,
          lastName,
          email,
          password,
        });
        await newUser.save();
      }
      res.json({
        message: `Users were created successfully!`,
        severity: "success",
      });
    }
  })
);

router.put(
  "/:id",
  asyncHandler(async function (req, res) {
    const { lastName, firstName, email, password } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404);
      res.json({
        message: `There is no user with id ${req.params.id}`,
        severity: "error",
      });
    } else {
      if (lastName) user.lastName = lastName;
      if (firstName) user.firstName = firstName;
      if (email) user.email = email;
      if (password) user.password = password;
      await user.save();
    }
    res.json({
      message: `The user with the id ${req.params.id} has been changed`,
      severity: "success",
    });
  })
);

router.delete(
  "",
  asyncHandler(async function (_req, res) {
    await User.deleteMany({});
    res.json({
      message: "All the users have been succesfully deleted!",
      severity: "success",
    });
  })
);

router.delete(
  "/:id",
  asyncHandler(async function (req, res) {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404);
      res.json({
        message: `There is no user with id ${req.params.id}`,
        severity: "error",
      });
    } else {
      await user.delete();
      res.json({
        message: `User with the id ${req.params.id} has been deleted`,
        severity: "success",
      });
    }
  })
);

module.exports = router;
