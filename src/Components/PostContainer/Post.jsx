import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { imageUrl, WarningIcon } from "../../icons/icons";
import axios from "../../utils/axios";
import { deletePost } from "../../utils/constants";

import { setDeletePost } from "../../state/userReducer";
import { likePost } from "../../state/apiCalls";

import EditPost from "./EditPost";
import ReportPost from "./ReportPost";
import Comments from "../comment/Comments";
import { SinglePostModal } from "../SinglePost/SinglePost";

import { BsThreeDots } from "react-icons/bs";

import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";

import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);

export default function Post(props) {
  const {
    postId,
    desc,
    author,
    image,
    likes,
    comments,
    render,
    forceRender,
    createdAt,
  } = props;

  const timeAgo = new TimeAgo("en-US");

  const [showSinglePost, setShowSinglePost] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [editPostModal, setEditPostModal] = useState(false);
  const [reportPostModal, setReportPostModal] = useState(false);

  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const dispatch = useDispatch();

  // ✅ Like system
  const userLiked = likes && likes[user._id];
  const likeCount = likes ? Object.keys(likes).length : 0;

  const PatchLike = () => {
    likePost(token, postId, dispatch);
    forceRender(!render);
  };

  // ✅ Delete post
  const handleDeletePost = async () => {
    try {
      const response = await axios.delete(`${deletePost}/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(setDeletePost({ id: response.data.id }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="transition mb-2 bg-transparent">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3 cursor-pointer">
          <img
            src={author?.profilePic || imageUrl}
            alt=""
            className="w-11 h-11 rounded-full object-cover border"
          />

          <div>
            <p className="font-semibold text-sm text-gray-900">
              {author?.userName}
            </p>

            <p className="text-xs text-gray-500">
              {timeAgo.format(new Date(createdAt))}
            </p>
          </div>
        </div>

        {user?._id === author?._id ? (
          <div className="relative">
            <BsThreeDots
              onClick={() => setShowMenu(!showMenu)}
              className="cursor-pointer text-xl text-gray-600 hover:text-black"
            />

            {showMenu && (
              <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-50">
                <button
                  onClick={handleDeletePost}
                  className="w-full text-left px-4 py-3 hover:bg-red-50 text-red-500 text-sm"
                >
                  Delete
                </button>

                <button
                  onClick={() => setEditPostModal(true)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 text-sm"
                >
                  Edit Post
                </button>
              </div>
            )}
          </div>
        ) : (
          <div
            onClick={() => setReportPostModal(true)}
            className="cursor-pointer text-gray-500 hover:text-black"
          >
            <WarningIcon />
          </div>
        )}
      </div>

      {desc && (
        <div className="px-4 pb-3">
          <p className="text-sm leading-6 text-gray-800">
            <span className="font-semibold mr-2">{author?.userName}</span>
            {desc}
          </p>
        </div>
      )}

      <div className="">
        <img
          src={image}
          alt="post"
          className="w-full min-h-[250px] max-w-[400px] object-cover mx-auto"
        />
      </div>

      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <button onClick={PatchLike} className="transition hover:scale-110">
              <Heart
                size={24}
                className={`transition ${
                  userLiked ? "fill-red-500 text-red-500" : "text-gray-700"
                }`}
              />
            </button>

            <button
              onClick={() => setShowSinglePost(true)}
              className="transition hover:scale-110"
            >
              <MessageCircle size={24} className="text-gray-700" />
            </button>

            <button className="transition hover:scale-110">
              <Send size={22} className="text-gray-700" />
            </button>
          </div>

          <button className="transition hover:scale-110">
            <Bookmark size={23} className="text-gray-700" />
          </button>
        </div>

        <div className="mt-3">
          <p className="font-semibold text-sm text-gray-900">
            {likeCount} likes
          </p>
        </div>

        {comments?.length > 0 && (
          <button
            onClick={() => setShowSinglePost(true)}
            className="mt-1 text-sm text-gray-500 hover:text-black"
          >
            View all {comments.length} comments
          </button>
        )}
      </div>

      {showSinglePost && !props.singlePost && (
        <SinglePostModal setShowSinglePost={setShowSinglePost} {...props} />
      )}

      {props.singlePost && (
        <Comments
          render={render}
          forceRender={forceRender}
          comments={comments}
          postId={postId}
        />
      )}

      {editPostModal && (
        <EditPost
          desc={desc}
          postId={postId}
          setEditPostModal={setEditPostModal}
        />
      )}

      {reportPostModal && (
        <ReportPost postId={postId} setReportPostModal={setReportPostModal} />
      )}
    </div>
  );
}
