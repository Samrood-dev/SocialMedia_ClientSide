import React, { useEffect, useState } from "react";
import Post from "./Post";
import axios from "../../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state/userReducer";
import { getPosts } from "../../utils/constants";
const Feed = ({ isMypost, render, forceRender, Profileposts, profileId }) => {
  let posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [showing, setShowing] = useState(2);

  function handleScroll() {
    const windowHeight =
      "innerHeight" in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight,
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight && showing < posts.length) {
      setShowing(showing + 2);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showing]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(getPosts, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      const postData = response.data;
      dispatch(setPosts({ posts: postData }));
    } catch (err) {}
    setLoading(false);
  };
  useEffect(() => {
    fetchPosts();
  }, []);
  if (loading)
    return (
      <div className=" mt-2 h-full w-full box-border rounded p-28 text-3xl font-semibold">
        Loading..............
      </div>
    );
  if (!posts)
    return (
      <div className=" mt-2 h-full w-full box-border rounded p-28 text-3xl font-semibold">
        No Posts Found
      </div>
    );
  if (isMypost) {
    return (
      <div className="max-w-fit mx-auto">
        {Profileposts?.length < 1 ? (
          <div className="bg-white mt-2 p-28 text-3xl font-semibold">
            No Posts !!
          </div>
        ) : (
          Profileposts?.map(
            ({ _id, desc, author, image, likes, comments, createdAt }) => (
              <Post
                render={render}
                forceRender={forceRender}
                key={_id}
                postId={_id}
                desc={desc}
                author={author}
                image={image}
                likes={likes}
                comments={comments}
                createdAt={createdAt}
              />
            ),
          )
        )}
      </div>
    );
  }
  return (
    <div className="p-5 max-w-fit">
      {posts?.length < 1 ? (
        <div className="bg-white mt-2 p-28 text-3xl font-semibold">
          No Posts !!
        </div>
      ) : (
        posts?.map(
          ({ _id, desc, author, image, likes, comments, createdAt }) => (
            <Post
              key={_id}
              postId={_id}
              desc={desc}
              author={author}
              image={image}
              likes={likes}
              comments={comments}
              createdAt={createdAt}
            />
          ),
        )
      )}
    </div>
  );
};

export default Feed;
