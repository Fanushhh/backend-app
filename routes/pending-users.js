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
    const pendingUser = await PendingUser.findById(req.params.id);
    try {
      if (!pendingUser) {
        res.status(404);
        res.json({
          message: `There is no pending user with that id ${req.params.id}`,
          severity: "error",
        });
      } else {
        res.json(pendingUser);
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
      for (const pendingUserData of req.body) {
        const { firstName, lastName, email, password } = pendingUserData;
        const pendingUser = await PendingUser.findOne({ email });

        if (pendingUser) {
          res.status(409);
          res.json({
            message: `There's already a pending user with that email ${email}`,
            severity: "error",
          });
          break;
        } else {
          const newPendingUser = new PendingUser({
            firstName,
            lastName,
            email,
            password,
          });
          await newPendingUser.save();
        }
      }
      res.json({
        message: `Users were created successfully!`,
        severity: "success",
      });
    } else {
      const { firstName, lastName, email, password } = req.body;
      const pendingUser = await User.findOne({ email });

      if (pendingUser) {
        res.status(409);
        res.json({
          message: `There's already a user pending registration with that email ${email}`,
          severity: "error",
        });
      } else {
        const pendingNewUser = new PendingUser({
          firstName,
          lastName,
          email,
          password,
        });
        await pendingNewUser.save();
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
    const pendingUser = await PendingUser.findById(req.params.id);

    if (!pendingUser) {
      res.status(404);
      res.json({
        message: `There is no user pending with id ${req.params.id}`,
        severity: "error",
      });
    } else {
      if (lastName) pendingUser.lastName = lastName;
      if (firstName) pendingUser.firstName = firstName;
      if (email) pendingUser.email = email;
      if (password) pendingUser.password = password;
      await pendingUser.save();
    }
    res.json({
      message: `The user with the id ${req.params.id} has been modified`,
      severity: "success",
    });
  })
); // ca si side note, nu sunt sigur ca avem nevoie de metoda de put pentru un pending User avand in vedere ca nu este creat inca n-ar trebui sa poti face modificari mid registration

router.delete(
  "",
  asyncHandler(async function (_req, res) {
    await PendingUser.deleteMany({});
    res.json({
      message: "All the users have been succesfully deleted!",
      severity: "success",
    });
  })
);

router.delete(
  "/:id",
  asyncHandler(async function (req, res) {
    const pendingUser = await PendingUser.findById(req.params.id);

    if (!pendingUser) {
      res.status(404);
      res.json({
        message: `There is no pending user with id ${req.params.id}`,
        severity: "error",
      });
    } else {
      await pendingUser.delete();
      res.json({
        message: `User with the id ${req.params.id} has been deleted`,
        severity: "success",
      });
    }
  })
);

module.exports = router;
