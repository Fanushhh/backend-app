import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
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

const User = mongoose.model('User', userSchema);

export default User;