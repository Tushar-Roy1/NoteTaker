import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  otp?: string;
  otpExpires?: Date;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  otp: { type: String },
  otpExpires: { type: Date },
});

export default mongoose.model<IUser>('User', UserSchema);
