import mongoose from "mongoose";
const Schema = mongoose.Schema;
const AboutSchema = new Schema({
  title: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
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
