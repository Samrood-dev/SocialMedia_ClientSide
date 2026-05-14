import React from "react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { imageUrl } from "../../icons/icons";

TimeAgo.addDefaultLocale(en);

const Notificationlist = ({ type, user, friend, content, post, createdAt }) => {
  const timeAgo = new TimeAgo("en-US");

  return (
    <div className="mb-3">
      <div
        className="
          flex
          items-start
          gap-3
          rounded-2xl
          border
          border-gray-200
          bg-white
          p-4
          shadow-sm
          transition-all
          hover:shadow-md
          hover:bg-gray-50
        "
      >
        {/* PROFILE IMAGE */}
        <div className="shrink-0">
          {friend?.profilePic ? (
            <img
              className="h-12 w-12 rounded-full object-cover border border-gray-200"
              src={friend?.profilePic}
              alt="profile-pic"
            />
          ) : (
            <div className="h-12 w-12 overflow-hidden rounded-full border border-gray-200">
              <img
                src={imageUrl}
                className="h-full w-full object-cover"
                alt="default-profile"
              />
            </div>
          )}
        </div>

        {/* CONTENT */}
        <div className="flex-1 min-w-0">
          <p className="text-sm leading-relaxed text-gray-700">
            <span className="font-semibold text-gray-900">
              {friend?.userName}
            </span>{" "}
            {content}
          </p>

          <p className="mt-1 text-xs text-gray-400">
            {timeAgo.format(new Date(createdAt))}
          </p>
        </div>

        {/* POST IMAGE */}
        {post?.image && (
          <div className="shrink-0">
            <img
              className="
                h-14
                w-14
                rounded-xl
                object-cover
                border
                border-gray-200
              "
              src={post?.image}
              alt="post"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Notificationlist;
