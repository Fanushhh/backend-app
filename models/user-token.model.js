const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userTokenSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        token: {
            type: String,
            required: true
        },
        expireDate: {
            type: Date,
            required: true
        }
    }, 
    {
        timestamps: true
    }
);

const UserToken = mongoose.model('UserToken', userTokenSchema);

module.exports = UserToken;