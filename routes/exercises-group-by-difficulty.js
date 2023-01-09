const express = require('express');
const asyncHandler = require('express-async-handler');
const Exercise = require('../models/exercise.model');
const router = express.Router();


router.get('', asyncHandler(async function(req, res){
    const exercises = await Exercise.find();
        
    const exercisesGroupedByDifficulty = exercises.reduce((dict, exercise) =>  {
        const difficulty = exercise.difficulty;
        difficulty in dict ?  dict[difficulty].push(exercise) : dict[difficulty] = [exercise];
        return dict;
    }, {});

    res.json(exercisesGroupedByDifficulty);
}))

module.exports = router;