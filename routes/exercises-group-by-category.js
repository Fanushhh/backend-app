const express = require('express');
const asyncHandler = require('express-async-handler');
const Exercise = require('../models/exercise.model');
const router = express.Router();


router.get('/:category', asyncHandler(async function(req, res){
    const exercises = await Exercise.find();
        
    exercisesGroupedByCategory = exercises.reduce((exercisesGroupedByCategory, exercise) =>  {

    }, {});

    res.json(exercisesGroupedByCategory);
}))

module.exports = router;