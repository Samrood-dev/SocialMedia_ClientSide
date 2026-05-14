import { useSelector } from "react-redux";
import Register from "./Pages/Register/Register";
import Profile from "./Pages/Profile/Profile";
import Login from "./Pages/Login/Login";
import Chat from "./Pages/Chat/Chat";
import Home from "./Pages/Home/Home";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ForgottPassword from "./Pages/ForgottPassword/ForgottPassword";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import OthersProfile from "./Pages/OthersProfile/OthersProfile";
import Notification from "./Pages/Notifications/Notification";
import VerifyEmail from "./Pages/VerifyEmail/VerifyEmail";
import Layout from "./Layout";

function App() {
  const userDetails = useSelector((state) => state.user);

  return (
    <div className="App border-box">
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={!userDetails ? <Login /> : <Navigate to={"/"} />}
          />

          <Route path="/register" element={<Register />} />
          <Route path="/verifyEmail/:id" element={<VerifyEmail />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/forgottPassword" element={<ForgottPassword />} />

          <Route element={<Layout />}>
            <Route
              path="/"
              element={
                userDetails && userDetails?.verified === true ? (
                  <Home />
                ) : (
                  <Navigate to={"/login"} />
                )
              }
            />

            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/othersprofile/:id" element={<OthersProfile />} />
            <Route path="/notifications" element={<Notification />} />
            <Route path="/chat" element={<Chat />} />

            <Route
              path="/success"
              element={
                <div className="text-3xl font-bold p-48 text-green-300">
                  check your email or spam page
                </div>
              }
            />
          </Route>

          <Route
            path="*"
            element={
              <div className="p-96 text-3xl font-bold">
                Bad Request
                <br />
                404 found
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
