

import asyncHandler from 'express-async-handler';
import Exercise from '../../models/exercise.js';

const exerciseViewRoute = asyncHandler(async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);

    if (!exercise) {
      res.status(404);
      res.json({
        message: `There is no exercise with id ${req.params.id}`,
        severity: "error",
      });
    } else {
      res.render("exercise", exercise.toObject());
    }
  } catch (error) {
    res.status = 500;
    res.json({ error: error.message, severity: "error" });
  }
});

export default exerciseViewRoute;