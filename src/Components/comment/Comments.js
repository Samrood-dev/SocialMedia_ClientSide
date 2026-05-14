import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { imageUrl, SubmitIcon } from "../../icons/icons";
import { setPost } from "../../state/userReducer";
import axios from "../../utils/axios";
const Comments = ({ postId, comments, render, forceRender }) => {
  const commentsRef = useRef(null);
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [comment, setComment] = useState("");
  const topRef = useRef(null);

  const dispatch = useDispatch();
  const handleComment = () => {
    if (comment === "") return;
    axios
      .post(
        `/posts/${postId}/comment`,
        { comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((response) => {
        dispatch(setPost({ posts: response.data }));
        setComment("");
        forceRender(!render);
      });
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    handleComment();
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="relative">
      <div ref={topRef} />
      {comments &&
        comments.map((item) => (
          <div className="pl-2" key={item._id}>
            <div className="flex gap-3 items-start pl-1 py-2 rounded-md font-sans cursor-pointer">
              {item?.author?.profilePic ? (
                <img
                  className="rounded-full w-10 h-10"
                  src={item?.author?.profilePic}
                  alt=""
                />
              ) : (
                <img className="rounded-full w-10 h-10" src={imageUrl} />
              )}
              <div className="bg-slate-100 w-fit rounded-l-2xl rounded-r-2xl mr-3 p-3">
                <p className="text-sm text-slate-500">
                  {item?.author?.userName}
                </p>
                <p className="">{item?.text}</p>
              </div>
            </div>
          </div>
        ))}
      <form className="sticky bg-white bottom-0" onSubmit={handleCommentSubmit}>
        <div className="flex p-2 gap-4">
          <div className=" py-2 rounded-md">
            <img
              className="rounded-full w-10 h-10"
              src={user.profilePic || imageUrl}
            />
          </div>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full outline-none "
          />
        </div>
      </form>
    </div>
  );
};

export default Comments;
