
import { Router } from "express";
import asyncHandler from "express-async-handler";
import Exercise from "../../models/exercise.js";
import router from "./exercises-group-by-difficulty.js";


router.get('/:category', asyncHandler(async function(req, res){
    const exercises = await Exercise.find();
        
    exercisesGroupedByCategory = exercises.reduce((exercisesGroupedByCategory, exercise) =>  {

    }, {});

    res.json(exercisesGroupedByCategory);
}))

export default router;