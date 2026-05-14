import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import axios from "../../utils/axios";
import { useDispatch, useSelector } from "react-redux";
// import { setPost } from '../../state/userReducer';
import { updatePost } from "../../utils/constants";
import { setPost } from "../../state/userReducer";

const EditPost = ({
  editPostModal,
  setEditPostModal,
  postId,
  setShowMenu,
  desc,
}) => {
  const token = useSelector((state) => state.token);
  const [content, setContent] = useState(desc);
  const dispatch = useDispatch();

  const handleEditPost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("content", content);
    const response = await axios.put(`${updatePost}/${postId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    const updatedPost = response.data;
    dispatch(setPost({ posts: updatedPost }));
    setEditPostModal(false);
    setShowMenu(false);
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 z-50"
        onClick={() => editPostModal && setEditPostModal(false)}
      >
        <div className="w-full max-w-md mx-auto mt-16">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-lg font-bold mb-4">Edit post</h2>

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
                onClick={handleEditPost}
                className="border border-zinc-500 mr-2 my-2  py-2 px-4 rounded"
              >
                Submit
              </button>
              <button
                onClick={() => setEditPostModal(false)}
                type="button"
                className="border border-zinc-500  py-3 px-4 rounded"
              >
                <FaArrowLeft />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditPost;
