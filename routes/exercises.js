const express = require("express");
const asyncHandler = require("express-async-handler");
const authMiddleware = require("../middleware/auth-middleware");
const Exercise = require("../models/exercise.model");
const router = express.Router();

router.get(
  "",
  asyncHandler(async function (_req, res) {
    const exercises = await Exercise.find();
    res.json(exercises);
  })
);

router.get(
  "/:id",
  asyncHandler(async function (req, res) {
    try {
      const exercise = await Exercise.findById(req.params.id);

      if (!exercise) {
        res.status(404);
        res.json({
          message: `There is no exercise with id ${req.params.id}`,
          severity: "error",
        });
      } else {
        res.json(exercise);
      }
    } catch (error) {
      res.status = 500;
      res.json({ error: error.message, severity: "error" });
    }
  })
);

router.post(
  "",
  authMiddleware,
  asyncHandler(async function (req, res) {
    const { id, name, difficulty, description } = req.body;

    const exercise = await Exercise.findById(id);
    if (exercise) {
      res.status(409);
      res.json({
        message: `There is already an exercise with ID ${id}!`,
        severity: "error",
      });
      return;
    }

    const newExercise = new Exercise({
      _id: id,
      name,
      difficulty,
      description,
    });

    await newExercise.save();

    res.json({
      message: "The exercise has been added to the database!",
      severity: "success",
    });
  })
);

router.put(
  "/:id",
  asyncHandler(async function (req, res) {
    const id = req.params.id;
    const { name, difficulty, description } = req.body;

    try {
      const exercise = await Exercise.findById(id);

      if (!exercise) {
        res.status(404);
        res.json({
          message: `There is no exercise with id ${id}`,
          severity: "error",
        });
      } else {
        if (name) exercise.name = name;
        if (difficulty) exercise.difficulty = difficulty;
        if (description) exercise.description = description;
        await exercise.save();
      }
      res.json({
        message: `The exercise with the id ${id} has been changed`,
        severity: "success",
      });
    } catch (error) {
      res.status = 500;
      res.json({ error: error.message, severity: "error" });
    }
  })
);

router.delete(
  "/:id",
  asyncHandler(async function (req, res) {
    const exercise = await Exercise.findById(req.params.id);

    if (!exercise) {
      res.status(404);
      res.json({
        message: `There is no user with id ${req.params.id}`,
        severity: "error",
      });
    } else {
      await exercise.delete();
      res.json({
        message: `User with the id ${req.params.id} has been deleted`,
        severity: "success",
      });
    }
  })
);

router.delete(
  "",
  asyncHandler(async function (req, res) {
    await Exercise.deleteMany({});
    res.json({
      message: "All the exercises have been succesfully deleted!",
      severity: "success",
    });
  })
);

module.exports = router;
