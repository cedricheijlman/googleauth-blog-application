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

// get all posts except from user
app.post("/allBlogsExcUser", async (req, res) => {
  try {
    let email = req.body.email;
    const allBlogsExcUser = await Blog.find({
      blogEmail: { $ne: email },
    });

    res.status(200).json({ status: "success", allBlogsExcUser });
  } catch (err) {
    res.status(400).json({ status: "error", errorMessage: err });
  }
});

// get user blogs
app.post("/userBlogs", async (req, res) => {
  try {
    const email = req.body.email;
    const userBlogs = await Blog.find({ blogEmail: email });

    res.status(200).json({ status: "success", userBlogs });
  } catch (err) {
    res.status(400).json({ status: "error", errorMessage: err });
  }
});

// add blog
app.post("/addBlog", async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);

    res.status(201).json({ status: "success", data: newBlog });
  } catch (err) {
    res.status(400).json({ status: "Error", errorMessage: err });
  }
});

<<<<<<< HEAD
const port = process.env.PORT || 3002;
=======
const port = process.env.port || 3001;
>>>>>>> 8810f0e6608532427506b640d6469428dae6e605
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
