import mongoose from "mongoose";
const Schema = mongoose.Schema;
const AboutSchema = new Schema({
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  firstName: {
    type: String,
    default: "",
  },
  lastName: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "",
  },
  location: {
    type: Object,
    default: {
      city: "",
      country: "",
    },
  },
  degree: {
    type: String,
    default: "",
  },
  social: {
    type: Array,
    default: [
      {
        id: "",
        name: "",
        icon: "",
        url: "",
      },
    ],
  },
});

const Abouts = mongoose.models?.Abouts || mongoose.model("Abouts", AboutSchema);

export default Abouts;
