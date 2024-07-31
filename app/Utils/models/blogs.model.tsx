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
  summary: {
    type: String,
    required: [true, "Özet Girin"],
  },
  author: {
    type: String,
  },
  date: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
  tags: {
    type: Array,
    default: [],
  },
  wiew: {
    type: Number,
    default: 0,
  },
  like: {
    type: Number,
    default: 0,
  },
  share: {
    type: Number,
    default: 0,
  },
});

const Blogs = mongoose.models?.Blogs || mongoose.model("Blogs", BlogsSchema);

export default Blogs;
