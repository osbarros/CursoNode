import mongoose from "mongoose";
import bcrypt from "bcrypt";
import SessionModel from "./SessionModel.js";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    message: {
      type: String,
      default: "",
    },
  },
  { versionKey: false }
);

UserSchema.pre("save", async function (next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  const SALT_FACTOR = 10;

  const salt = await bcrypt.genSalt(SALT_FACTOR);
  const hashedPassword = await bcrypt.hash(user.password, salt);

  user.password = hashedPassword;

  return next();
});

// Delete all instances associated to that user
UserSchema.pre(
  "deleteOne",
  { document: true, query: false }, // More details on https://mongoosejs.com/docs/api/schema.html#schema_Schema-pre
  async function (next) {
    const userId = this._id;

    await SessionModel.deleteMany({ user: userId }).exec();
    next();
  }
);

UserSchema.methods.comparePasswords = function (password) {
  const hashedPassword = this.password;

  return bcrypt.compare(password, hashedPassword);
};

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
