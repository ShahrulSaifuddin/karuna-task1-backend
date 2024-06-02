import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    userName: String,
    email: String,
    password: String,
  },
  { timestamps: true }
);

UserSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model('User', UserSchema);
