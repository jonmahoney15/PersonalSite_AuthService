import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IAdmin extends Document {
  comparePassword(arg0: string): boolean;
  FirstName: string;
  LastName: string;
  Email: string;
  HashPassword: string;
  Date: Date;
}

const AdminSchema: Schema = new Schema({
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  HashPassword: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    default: Date.now,
  },
});

AdminSchema.pre("save", async function (next) {
  const user = this as IAdmin;
  try {
    if (!user.isModified("password") && !this.isNew) next();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.HashPassword, salt);
    user.HashPassword = hashedPassword;
    next();
  } catch (error: Error | any | undefined) {
    return next(error.message);
  }
});

AdminSchema.methods.comparePassword = function (plainPwd) {
  const user = this as IAdmin;
  return bcrypt.compareSync(plainPwd, user.HashPassword);
};

export const Admin = mongoose.model<IAdmin>("Admin", AdminSchema);
