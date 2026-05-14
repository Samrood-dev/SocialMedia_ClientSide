import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import { forgotPassword } from "../../utils/constants";
const ForgottPassword = () => {
  const [email, setEmail] = useState(null);
  const navigate = useNavigate();
  const handleEmail = (e) => {
    e.preventDefault();
    if (email) {
      axios
        .post(forgotPassword, { email: email })
        .then((response) => {
          toast.success(response.data.msg);
          navigate("/success");
        })
        .catch((err) => {
          toast.error(err.response.data.msg);
        });
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl grid md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-white/10 backdrop-blur-lg">
        <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-cyan-500 to-blue-600 p-12 text-white">
          <h1 className="text-5xl font-bold leading-tight">
            Reset Password 🔒
          </h1>

          <p className="mt-6 text-lg text-white/90">
            Don’t worry. Enter your email address and we’ll send you a password
            reset link.
          </p>

          <div className="mt-10 space-y-5">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-white"></div>
              <p>Secure password recovery</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-white"></div>
              <p>Fast email verification</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-white"></div>
              <p>Get back to your account quickly</p>
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

            <h2 className="mt-5 text-3xl font-bold text-gray-800">
              Forgot Password
            </h2>

            <p className="mt-2 text-sm text-gray-500 text-center">
              Enter your registered email address
            </p>
          </div>

          <form className="mt-10 space-y-6">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>

              <input
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                name="email"
                type="email"
                required
                placeholder="Enter your email address"
                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition-all focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
              />
            </div>

            <button
              onClick={handleEmail}
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-cyan-500/30"
            >
              Send Reset Link
            </button>
          </form>

          <Toaster />
        </div>
      </div>
    </div>
  );
};

export default ForgottPassword;
