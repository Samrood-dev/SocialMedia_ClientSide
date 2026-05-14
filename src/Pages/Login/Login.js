import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "../../utils/axios";
import { setLogin } from "../../state/userReducer";
import toast, { Toaster } from "react-hot-toast";
import { googleLogin, loginPost } from "../../utils/constants";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(
        loginPost,
        { userName, password },
        {
          headers: { "Content-Type": "application/json" },
        },
      )
      .then((userData) => {
        dispatch(setLogin(userData.data));
        navigate("/");
      })
      .catch((err) => {
        ((error) => {
          toast.error(error.response.data.msg, {
            position: "top-center",
          });
        })(err);
      });
  };
  const responseMessage = (response) => {
    setUser(response.credential);
  };
  const errorMessage = (error) => {
    console.log(error);
  };
  useEffect(() => {
    if (user) {
      const getUser = async () => {
        const response = await axios.get(googleLogin, {
          headers: {
            Authorization: `barear ${user}`,
          },
        });
        dispatch(setLogin(response.data));
        navigate("/");
      };
      getUser();
    }
  }, [user, dispatch, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white/10 backdrop-blur-lg rounded-3xl overflow-hidden shadow-2xl border border-white/10">
        <div className="hidden md:flex flex-col justify-center p-12 text-white bg-gradient-to-br from-cyan-500 to-blue-600">
          <h1 className="text-5xl font-bold leading-tight">Welcome Back 👋</h1>

          <p className="mt-6 text-lg text-white/90">
            Connect with friends, share moments, and chat in real-time.
          </p>

          <div className="mt-10 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-white"></div>
              <p>Real-time messaging</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-white"></div>
              <p>Share photos & posts</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-white"></div>
              <p>Follow and connect</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 md:p-12">
          <div className="flex flex-col items-center">
            <img
              className="h-14 w-14 rounded-2xl object-cover shadow-lg"
              src="https://st2.depositphotos.com/4398873/9839/i/600/depositphotos_98397934-stock-photo-triangle-geometric-knot-outline-logo.jpg"
              alt="Logo"
            />

            <h2 className="mt-5 text-3xl font-bold text-gray-800">Sign In</h2>

            <p className="mt-2 text-sm text-gray-500">
              Login to continue your journey
            </p>
          </div>

          <form className="mt-10 space-y-5" onSubmit={(e) => handleLogin(e)}>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Username
              </label>

              <input
                onChange={(e) => setUserName(e.target.value)}
                type="text"
                required
                placeholder="Enter your username"
                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition-all focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Password
              </label>

              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
                placeholder="Enter your password"
                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition-all focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <Link
                to="/register"
                className="text-cyan-600 hover:text-cyan-700 font-medium"
              >
                Create account
              </Link>

              <p
                onClick={() => navigate("/forgottPassword")}
                className="cursor-pointer text-gray-500 hover:text-gray-700"
              >
                Forgot password?
              </p>
            </div>

            <div className="flex justify-center pt-2">
              <GoogleOAuthProvider
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
              >
                <GoogleLogin
                  onSuccess={responseMessage}
                  onError={errorMessage}
                />
              </GoogleOAuthProvider>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-cyan-500/30"
            >
              Sign In
            </button>

            <Toaster />
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
