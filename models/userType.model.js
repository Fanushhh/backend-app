const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userTypeSchema = new Schema(
    {
        lastName: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxLength: 30
        },
        firstName: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxLength: 30
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 6,
            maxLength: 100
        },
        password: {
            type: String,
            required: true
        }
    }, 
    {
        timestamps: true
    }
);

const UserType = mongoose.model('UserType', userTypeSchema);

module.exports = UserType;