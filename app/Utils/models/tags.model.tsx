import mongoose from "mongoose";
const Schema = mongoose.Schema;
const TagsSchema = new Schema({
  name: {
    type: String,
  },
  count: {
    type: Number,
  },
});

const Tags = mongoose.models?.Tags || mongoose.model("Tags", TagsSchema);

export default Tags;
