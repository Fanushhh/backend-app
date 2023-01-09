const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const resourceSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxLength: 100
        },
        type: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxLength: 30
        },
        price: {
            type: Number,
            required: true,
            trim: true,
            minlength: 2,
            maxLength: 10 
        },
        author:{
            type: String,
            required: true,
            trim: true,
            minlength:2,
            maxLength: 16
        },
        availability:{
            type: Boolean,
            required:true,
        }

    },
    {
        timestamps: true
    }
);

const Resource = mongoose.model('Resource', resourceSchema);

module.exports = Resource;