import React, { useEffect, useState } from "react";
import { GoogleLogout } from "react-google-login";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
function Dashboard({
  imgUrl,
  username,
  setUsername,
  setImgUrl,
  setEmail,
  email,
}) {
  const [currentOption, setCurrentOption] = useState("allBlogs");
  const [allBlogs, setAllBlogs] = useState(null);
  const [myBlogs, setMyBlogs] = useState(null);

  const [newBlogName, setNewBlogName] = useState(null);
  const [newBlogMessage, setNewBlogMessage] = useState(null);

  const logout = (result) => {
    console.log(result);
    setUsername(null);
    setImgUrl(null);
    setEmail(null);
  };

  const addNewBlog = () => {
    if (
      newBlogMessage &&
      newBlogName &&
      newBlogName !== "" &&
      newBlogMessage !== ""
    ) {
      Axios.post("http://localhost:3001/addBlog", {
        blogName: newBlogName,
        blogMessage: newBlogMessage,
        blogUser: username,
        blogEmail: email,
      }).then((result) => {
        console.log(result);
      });
    }
  };

  let navigate = useNavigate();
  useEffect(() => {
    if (!username) {
      navigate("/");
    }

    if (username) {
      Axios.post("http://localhost:3001/allBlogsExcUser", {
        email: email,
      }).then((result) => {
        setAllBlogs(result.data.allBlogsExcUser);
      });

      Axios.post("http://localhost:3001/userBlogs", {
        email: email,
      }).then((result) => {
        console.log(result);
        setMyBlogs(result.data.userBlogs);
      });
    }
  }, [username]);

  return (
    <div className="dashboard">
      {username && (
        <div className="dashboard">
          {username}
          <img width={100} src={imgUrl} />
          <GoogleLogout
            buttonText="Logout with google"
            onLogoutSuccess={logout}
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
          />

          <div className="optionsList">
            <p
              className={currentOption == "allBlogs" ? "selected" : ""}
              onClick={() => setCurrentOption("allBlogs")}
            >
              All Blogs
            </p>
            <p
              className={currentOption == "myBlogs" ? "selected" : ""}
              onClick={() => setCurrentOption("myBlogs")}
            >
              My Blogs
            </p>
            <p
              className={currentOption == "addBlog" ? "selected" : ""}
              onClick={() => setCurrentOption("addBlog")}
            >
              Add Blog
            </p>
          </div>

          {currentOption == "allBlogs" && (
            <div className="blogContainer">
              <h2>All Blogs</h2>
              <div className="blogsRow">
                {allBlogs &&
                  allBlogs.map((blog) => {
                    return (
                      <div key={blog._id} className="blog">
                        <h2>{blog.blogName}</h2>

                        <p>{blog.blogMessage}</p>
                        <p>Blog by: {blog.blogUser}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {currentOption == "myBlogs" && (
            <div className="blogContainer">
              <h2>My Blogs</h2>
              <div className="blogsRow">
                {myBlogs &&
                  myBlogs.map((blog) => {
                    return (
                      <div key={blog._id} className="blog">
                        <h2>{blog.blogName}</h2>

                        <p>{blog.blogMessage}</p>
                        <p>Blog by: {blog.blogUser}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {currentOption == "addBlog" && (
            <div className="blogContainer">
              <h2>Add Blog</h2>
              <h5>Blog Name</h5>
              <input onChange={(e) => setNewBlogName(e.target.value)} />
              <h5>Blog Message</h5>
              <textarea
                onChange={(e) => {
                  setNewBlogMessage(e.target.value);
                }}
              />
              <button onClick={addNewBlog}>Add Blog</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
