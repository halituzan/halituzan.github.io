import mongoose from "mongoose";
const Schema = mongoose.Schema;
const IconsSchema = new Schema({
  name: {
    type: String,
  },
  icon: {
    type: String,
  },
  id: {
    type: String,
  },
});

const Icons = mongoose.models?.Icons || mongoose.model("Icons", IconsSchema);

export default Icons;
