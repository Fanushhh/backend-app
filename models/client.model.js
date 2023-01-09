const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const clientSchema = new Schema(
    {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }, 
    {
        timestamps: true
    }
);

const Client = mongoose.model('User', clientSchema);

module.exports = Client;