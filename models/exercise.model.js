const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema(
    {
        _id: {
            type: Number,
            required: true,
            minlength: 1,
            maxlength: 10
        },
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 30
        },
        difficulty: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 30
        },
        description: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 100 
        }
    },
    {
        timestamps: true
    }
);

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;