import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import Post from "../PostContainer/Post";

export const SinglePostModal = (props) => {
  return (
    <>
      <div
        className="fixed inset-0 z-50 flex justify-center w-full max-h-screen overflow-y-auto overflow-x-hidden bg-black bg-opacity-50"
        aria-hidden="true"
        onClick={() => props.setShowSinglePost(false)}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="relative p-4 w-full rounded-xl max-w-2xl bg-white"
        >
          <Post {...props} singlePost={true} />
        </div>
      </div>
    </>
  );
};
