import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);

export default User;

const EnrollmentSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  courseIDs: [
    {
      type: Number,
      required: true,
    },
  ],
});

export const Enrollment = mongoose.model("Enrollment", EnrollmentSchema);
