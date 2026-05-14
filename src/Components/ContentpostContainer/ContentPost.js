import axios from "../../utils/axios";
import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../../utils/constants";
import { setPosts } from "../../state/userReducer";

import toast, { Toaster } from "react-hot-toast";

import { IoMdClose } from "react-icons/io";
import { ImagePlus, PlusSquare } from "lucide-react";

const ContentPost = ({ setOpenToCreate }) => {
  const userData = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts);

  const dispatch = useDispatch();
  const desc = useRef("");

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [loading, setLoading] = useState(false);

  // ✅ Cleanup preview URL
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  // ✅ Image Preview
  const handleImageChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  // ✅ Upload Post
  const handlePost = async () => {
    if (!desc.current.value.trim()) {
      toast.error("Write something...");
      return;
    }

    if (!file) {
      toast.error("Select an image");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", userData._id);
      formData.append("desc", desc.current.value);

      const res = await axios.post(addPost, formData);

      dispatch(setPosts({ posts: [res.data, ...posts] }));

      toast.success("Post Created ✅");

      // Reset
      setFile(null);
      setPreview(null);
      desc.current.value = "";
      setOpenCreate(false);

      setLoading(false);
    } catch (err) {
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-30 bg-black/60 flex justify-center items-center">
        <div className="bg-white w-[500px] rounded-2xl shadow-xl overflow-hidden">
          <div className="flex justify-between items-center px-5 py-4 border-b">
            <p className="font-semibold text-base">Create new post</p>

            <IoMdClose
              className="cursor-pointer text-2xl hover:text-red-500"
              onClick={() => setOpenToCreate(false)}
            />
          </div>

          <div className="p-5 space-y-4">
            <textarea
              ref={desc}
              placeholder="Write a caption..."
              className="w-full border rounded-lg p-3 text-sm outline-none resize-none focus:ring-2 focus:ring-blue-400"
            />

            <label className="cursor-pointer block">
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />

              <div className="border-2 border-dashed rounded-xl p-6 text-center text-gray-500 hover:border-blue-400 transition">
                {preview ? (
                  <img
                    src={preview}
                    alt="preview"
                    className="w-full max-h-[250px] rounded-xl object-cover"
                  />
                ) : (
                  <p className="text-sm">Click to upload photo 📷</p>
                )}
              </div>
            </label>

            <button
              disabled={loading}
              onClick={handlePost}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-xl text-sm font-semibold disabled:opacity-50"
            >
              {loading ? "Posting..." : "Share"}
            </button>
          </div>

          <Toaster />
        </div>
      </div>
    </>
  );
};

export default ContentPost;
