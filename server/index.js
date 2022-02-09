const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./models/blogModel");

const cors = require("cors");

const app = express();

app.use(express.json());
require("dotenv").config();

app.use(cors());

let db = process.env.DATABASE;

mongoose
  .connect(db, {
    useNewUrlParser: true,
  })
  .then((conn) => {
    console.log("test");
  });

// get all posts
app.get("/allBlogs", async (req, res) => {
  try {
    const allBlogs = await Blog.find();

    res.status(200).json({ status: "success", allBlogs });
  } catch (err) {
    res.status(400).json({ status: "error", errorMessage: err });
  }
});

// get all posts except from user
app.get("/allBlogsExcUser", (req, res) => {});

// get user blogs
app.get("userBlogs", (req, res) => {});

// add blog
app.post("/addBlog", async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);

    res.send(201).json({ status: "success", data: newBlog });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "Error", errorMessage: err });
  }
});

const port = 3001;
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
