const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userTypeSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxLength: 20
        }
    }, 
    {
        timestamps: true
    }
);

const UserType = mongoose.model('UserType', userTypeSchema);

module.exports = UserType;