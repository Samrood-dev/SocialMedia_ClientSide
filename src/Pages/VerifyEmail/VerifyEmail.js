import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setLogin } from "../../state/userReducer";
import axios from "../../utils/axios";
import { verifyEmail } from "../../utils/constants";
import toast, { Toaster } from "react-hot-toast";

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = useParams();

  const [otp, setOtp] = useState(null);
  const handleOtp = (e) => {
    e.preventDefault();
    if (otp != null) {
      axios
        .post(verifyEmail, { userId: userId.id, otp: otp })
        .then((Response) => {
          dispatch(setLogin(Response.data));
          navigate("/login");
        })
        .catch((err) => {
          toast.error(err.response.data.msg);
        });
    }
  };
  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl h-[85vh] grid md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-white/10 backdrop-blur-lg">
        <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-cyan-500 to-blue-600 p-8 text-white">
          <h1 className="text-4xl font-bold leading-tight">
            Verify Your Email ✉️
          </h1>

          <p className="mt-4 text-base text-white/90">
            We’ve sent a verification code to your email address. Enter the OTP
            below to activate your account.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-white"></div>
              <p>Secure account verification</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-white"></div>
              <p>Fast email confirmation</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-white"></div>
              <p>Protect your account access</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 flex flex-col justify-center">
          <div className="flex flex-col items-center">
            <img
              className="h-12 w-12 rounded-2xl object-cover shadow-lg"
              src="https://st2.depositphotos.com/4398873/9839/i/600/depositphotos_98397934-stock-photo-triangle-geometric-knot-outline-logo.jpg"
              alt="Logo"
            />

            <h2 className="mt-4 text-2xl font-bold text-gray-800">
              OTP Verification
            </h2>

            <p className="mt-1 text-sm text-gray-500 text-center">
              Enter the verification code sent to your email
            </p>
          </div>

          <form className="mt-8 space-y-5">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Verification Code
              </label>

              <input
                id="otp"
                name="otp"
                type="text"
                required
                maxLength={6}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-center tracking-[10px] text-lg font-semibold outline-none transition-all focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
              />
            </div>

            <button
              type="submit"
              onClick={handleOtp}
              className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-cyan-500/30"
            >
              Verify Account
            </button>
          </form>

          <Toaster />
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
