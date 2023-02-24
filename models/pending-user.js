import mongoose from "mongoose";

const Schema = mongoose.Schema;

const pendingUserSchema = new Schema(
  {
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxLength: 30,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxLength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 6,
      maxLength: 100,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    userTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserType",
    },
  },
  {
    timestamps: true,
  }
);

const PendingUser = mongoose.model("PendingUser", pendingUserSchema);

export default PendingUser;
