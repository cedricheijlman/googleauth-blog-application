const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  blogName: {
    type: String,
    required: [true, "Blog must have a blog name"],
  },
  blogMessage: {
    type: String,
    required: [true, "Blog must have an message"],
  },
  blogUser: {
    type: String,
    required: [true, "Blog must have user"],
  },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
