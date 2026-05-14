import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { object, string } from "yup";
import { setUserData } from "../../state/userReducer";
import axios from "../../utils/axios";
import { editProfile } from "../../utils/constants";
const EditProfile = ({ setIsModal }) => {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const initialValues = {
    userName: user.userName,
    bio: user.bio,
    email: user.email,
    phoneNumber: user.phoneNumber,
  };
  const profileSchema = object({
    email: string().email().required("Email Required"),
    userName: string().min(2).max(20).required("please enter your username "),
    phoneNumber: string()
      .matches(/^\d{10}$/, "Please enter a 10-digit phone number")
      .required("Phone is required"),
    bio: string(),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = (values) => {
    setIsSubmitting(true);
    const userId = user._id;
    const { userName, email, bio, phoneNumber } = values;
    const data = { userName, email, bio, phoneNumber, userId };
    axios
      .put(editProfile, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        dispatch(setUserData({ user: response.data.user }));
        setIsSubmitting(false);
        setIsModal(false);
      })
      .catch((err) => {
        setIsSubmitting(false);
        setIsModal(false);
      });
  };
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
        <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">Edit Profile</h2>

                <p className="text-sm text-white/80 mt-1">
                  Update your personal information
                </p>
              </div>

              <button
                onClick={() => setIsModal(false)}
                className="h-10 w-10 rounded-full bg-white/20 text-white hover:bg-white/30 transition"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="p-6">
            <Formik
              initialValues={initialValues}
              validationSchema={profileSchema}
              onSubmit={handleSubmit}
            >
              <Form className="space-y-5">
                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Username
                  </label>

                  <Field
                    type="text"
                    name="userName"
                    placeholder="Enter username"
                    className="mt-2 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                  />

                  <ErrorMessage
                    name="userName"
                    component="div"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Email Address
                  </label>

                  <Field
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    className="mt-2 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                  />

                  <ErrorMessage
                    name="email"
                    component="div"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Bio
                  </label>

                  <Field
                    as="textarea"
                    rows={4}
                    name="bio"
                    placeholder="Tell something about yourself..."
                    className="mt-2 w-full resize-none rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                  />

                  <ErrorMessage
                    name="bio"
                    component="div"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-700">
                    Phone Number
                  </label>

                  <Field
                    type="text"
                    name="phoneNumber"
                    placeholder="Enter phone number"
                    className="mt-2 w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none transition-all focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                  />

                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 font-semibold text-white shadow-lg transition-all hover:scale-[1.01] disabled:opacity-50"
                  >
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsModal(false)}
                    className="flex-1 rounded-xl border border-gray-300 bg-white py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
