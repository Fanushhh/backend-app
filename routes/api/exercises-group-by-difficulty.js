
import { Router } from "express";
import asyncHandler from "express-async-handler";
import Exercise from "../../models/exercise.js";

const router = Router();

router.get(
  "",
  asyncHandler(async function (req, res) {
    const exercises = await Exercise.find();
    const exercisesGroupedByDifficulty = exercises.reduce((dict, exercise) => {
      const difficulty = exercise.difficulty.toLocaleLowerCase();
      difficulty in dict
        ? dict[difficulty].push(exercise)
        : (dict[difficulty] = [exercise]);
      return dict;
    }, {});

    res.json(exercisesGroupedByDifficulty);
  })
);



export default router;
