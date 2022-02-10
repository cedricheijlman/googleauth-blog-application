import React from "react";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
function Login({ setUsername, setImgUrl, setEmail }) {
  let navigate = useNavigate();
  const handleLogin = (googleData) => {
    console.log(googleData);
    setUsername(googleData.profileObj.name);
    setImgUrl(googleData.profileObj.imageUrl);
    setEmail(googleData.profileObj.email);
    navigate("/dashboard");
  };

  const handleFailure = (result) => {
    console.log(result);
  };
  return (
    <div>
      <h1>Roc Dev Blog Posts</h1>
      <GoogleLogin
        theme="dark"
        hostedDomain="roc-dev.com"
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Login with google"
        onSuccess={handleLogin}
        onFailure={handleFailure}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      ></GoogleLogin>
    </div>
  );
}

export default Login;
