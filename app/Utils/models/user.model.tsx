import mongoose from "mongoose";
const Schema = mongoose.Schema;
const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "Adınızı girmeniz gerekiyor."],
  },
  lastName: {
    type: String,
    required: [true, "Soy adınızı girmeniz gerekiyor."],
  },
  email: {
    type: String,
    required: [true, "Email girmeniz gerekiyor"],
    unique: true,
  },
  userName: {
    type: String,
    required: [true, "Username girmeniz gerekiyor"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Şifre girmeniz gerekiyor"],
  },
});

const Users = mongoose.models?.Users || mongoose.model("Users", userSchema);

export default Users;
