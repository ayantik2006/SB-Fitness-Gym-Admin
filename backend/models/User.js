import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  recentForgotPasswordEmailTime: {
    type: Number,
    default: 0,
  },
  isForgotPasswordDone: {
    type: Boolean,
    default: false,
  },
});

const User = model("User", UserSchema);

export default User;
