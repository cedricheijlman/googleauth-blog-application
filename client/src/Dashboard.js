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

  const logout = (result) => {
    console.log(result);
    setUsername(null);
    setImgUrl(null);
    setEmail(null);
  };
  let navigate = useNavigate();
  useEffect(() => {
    if (!username) {
      navigate("/");
    }

    if (username) {
      Axios.get("http://localhost:3001/allBlogs").then((result) => {
        console.log(result.data.allBlogs);
        setAllBlogs(result.data.allBlogs);
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
        </div>
      )}
    </div>
  );
}

export default Dashboard;
