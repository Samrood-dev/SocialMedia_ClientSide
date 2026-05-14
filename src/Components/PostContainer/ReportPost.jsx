import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import axios from "../../utils/axios";
import { useSelector } from "react-redux";
import { reportPost } from "../../utils/constants";
import toast, { Toaster } from "react-hot-toast";

const ReportPost = ({ setReportPostModal, postId }) => {
  const token = useSelector((state) => state.token);
  const [content, setContent] = useState("");

  const handleReportPost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("content", content);
    axios
      .post(`${reportPost}/${postId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        toast.success(response.data, {
          position: "top-center",
        });
        setTimeout(() => {
          setReportPostModal(false);
        }, 1000);
      });
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 z-50">
        <div className="w-full max-w-md mx-auto mt-16">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-bold mb-4">Report post</h2>

            <form>
              <label>Content</label>
              <input
                onChange={(e) => setContent(e.target.value)}
                value={content}
                className="w-full rounded-md border border-zinc-400 p-3 outline-none"
                type="text"
                name="content"
              />

              <button
                type="submit"
                onClick={handleReportPost}
                className="border border-zinc-500 mr-2 my-2  py-2 px-4 rounded"
              >
                Submit
              </button>
              <button
                onClick={() => setReportPostModal(false)}
                type="button"
                className="border border-zinc-500  py-3 px-4 rounded"
              >
                <FaArrowLeft />
              </button>
              <Toaster />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportPost;
