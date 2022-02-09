import "./App.css";
import GoogleLogin from "react-google-login";
import { useState } from "react";
import { GoogleLogout } from "react-google-login";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";

function App() {
  const [username, setUsername] = useState(null);
  const [imgUrl, setImgUrl] = useState(null);
  const [email, setEmail] = useState(null);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Login
              setEmail={setEmail}
              setUsername={setUsername}
              setImgUrl={setImgUrl}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              imgUrl={imgUrl}
              setUsername={setUsername}
              setImgUrl={setImgUrl}
              username={username}
              email={email}
              setEmail={setEmail}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
