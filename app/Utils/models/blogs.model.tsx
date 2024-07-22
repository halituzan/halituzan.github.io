import mongoose from "mongoose";
const Schema = mongoose.Schema;
const BlogsSchema = new Schema({
  title: {
    type: String,
    required: [true, "Başlık Girin"],
  },
  content: {
    type: String,
    required: [true, "Açıklamayı Girin"],
  },
  author: {
    type: String,
  },
  date: {
    type: Date,
  },
  like: {
    type: Number,
    default: 0,
  },
  tags: {
    type: Array,
    default: [],
  },
});

const Blogs = mongoose.models?.Blogs || mongoose.model("Blogs", BlogsSchema);

export default Blogs;
