import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import { toast, Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import * as yup from "yup";
import { signupPost } from "../../utils/constants";

const initialValues = {
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
  confirm_password: "",
};
const Register = () => {
  const navigate = useNavigate();
  const SignUpSchema = yup.object({
    email: yup.string().email().required("Email Required"),
    name: yup
      .string()
      .min(2)
      .max(20)
      .required("please enter your Actual Name "),
    phoneNumber: yup
      .string()
      .matches(/^\d{10}$/, "Invalid phone number")
      .required("Phone is required"),
    password: yup.string().min(6).required("please Enter password"),
    confirm_password: yup
      .string()
      .required()
      .oneOf([yup.ref("password"), null], "password must match"),
  });

  const { handleBlur, handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: SignUpSchema,
      onSubmit: (values, action) => {
        handleSignUp(values);
        // action.resetForm();
      },
    });
  let handleSignUp = (user) => {
    axios
      .post(signupPost, user)
      .then((response) => {
        const savedUser = response.data;

        if (savedUser?.status === "pending") {
          navigate(`/verifyEmail/${savedUser.user}`);
        }
      })
      .catch((err) => {
        console.log("🚀 ~ handleSignUp ~ err:", err);
        toast.error(err.response.data.msg, {
          position: "top-center",
        });
      });
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl grid md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-white/10 backdrop-blur-lg">
        <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-cyan-500 to-blue-600 p-12 text-white">
          <h1 className="text-5xl font-bold leading-tight">
            Join The Community 🚀
          </h1>

          <p className="mt-6 text-lg text-white/90">
            Create your account and start sharing moments, chatting with
            friends, and connecting with people.
          </p>

          <div className="mt-10 space-y-5">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-white"></div>
              <p>Real-time messaging</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-white"></div>
              <p>Create & share posts</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-white"></div>
              <p>Connect with friends</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 md:p-10">
          <div className="flex flex-col items-center">
            <img
              className="h-14 w-14 rounded-2xl object-cover shadow-lg"
              src="https://st2.depositphotos.com/4398873/9839/i/600/depositphotos_98397934-stock-photo-triangle-geometric-knot-outline-logo.jpg"
              alt="Logo"
            />

            <h2 className="mt-5 text-3xl font-bold text-gray-800">
              Create Account
            </h2>

            <p className="mt-2 text-sm text-gray-500">Register to continue</p>
          </div>

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Full Name
              </label>

              <input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                id="name"
                name="name"
                type="text"
                autoComplete="off"
                placeholder="Enter your full name"
                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition-all focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
              />

              {errors.name && touched.name ? (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              ) : null}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>

              <input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                id="email"
                name="email"
                type="email"
                autoComplete="off"
                placeholder="Enter your email"
                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition-all focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
              />

              {errors.email && touched.email ? (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              ) : null}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">
                Phone Number
              </label>

              <input
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.phoneNumber}
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                autoComplete="off"
                placeholder="Enter phone number"
                className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition-all focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
              />

              {errors.phoneNumber && touched.phoneNumber ? (
                <p className="mt-1 text-sm text-red-500">
                  {errors.phoneNumber}
                </p>
              ) : null}
            </div>

            <div className="flex flex-row gap-2">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>

                <input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="off"
                  placeholder="Enter password"
                  className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition-all focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                />

                {errors.password && touched.password ? (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                ) : null}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">
                  Confirm Password
                </label>

                <input
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirm_password}
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                  autoComplete="off"
                  placeholder="Confirm your password"
                  className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition-all focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                />

                {errors.confirm_password && touched.confirm_password ? (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.confirm_password}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="text-center pt-2">
              <Link
                to="/login"
                className="text-sm font-medium text-cyan-600 hover:text-cyan-700"
              >
                Already have an account?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-cyan-500/30"
            >
              Create Account
            </button>

            <Toaster />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
