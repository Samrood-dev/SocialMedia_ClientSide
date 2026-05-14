import { addFollow, getFrieds, unfollow } from "../../utils/constants";
import { useNavigate, useParams } from "react-router-dom";
import { PhotoIcon, PostIcon, UserGroupIcon } from "../../icons/icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchMypost, getProfileUser, handleChat } from "../../state/apiCalls";
import React, { useEffect, useState } from "react";
import Feed from "../PostContainer/Feed";
import Card from "../smallComponants/Card";
import Friends from "./Friends";
import Images from "./Images";
import ProfilePic from "../ProfilePic/ProfilePic";
import EditProfile from "../EditProfile/EditProfile";
import axios from "../../utils/axios";
import { setUserData } from "../../state/userReducer";

const ProfileMainPost = () => {
  const params = useParams();
  const profileId = params.id;
  const userData = useSelector((state) => state.user);
  const chat = useSelector((state) => state.chat);
  //editprofile modal
  const [isModal, setIsModal] = useState(false);
  const [tab, setTab] = useState("posts");
  const active =
    "transition duration-200 hover:bg-zinc-300 rounded flex gap-1 px-2 md:px-4 py-1 items-center border-black border-b text-blue-600";
  const nonActive =
    "transition duration-200 hover:bg-gray-300 rounded flex gap-1 px-2 md:px-4 py-1 items-center";

  // followings followers
  const [followings, setFollowings] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [profileUser, setProfileUser] = useState([]);
  const [render, forceRender] = useState(false);
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  const conversation = useSelector((state) => state.conversation);
  const navigate = useNavigate();
  const getFollowers = () => {
    axios
      .get(`${getFrieds}/${profileId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setFollowings(response.data.followings);
        setFollowers(response.data.followers);
      });
  };
  const fetchProfileUser = async () => {
    const profileUser = await getProfileUser(token, profileId);
    setProfileUser(profileUser);
  };
  useEffect(() => {
    getFollowers();
    fetchImages();
    fetchProfileUser();
  }, [render]);

  const fetchImages = async () => {
    console.log("🚀 ~ fetchImages ~ fetchImages:");
    const response = await fetchMypost(token, profileId);
    setPosts(response);
  };

  const [Following, setFollowing] = useState(false);
  const dispatch = useDispatch();
  useState(() => {
    setFollowing(user.followings.includes(profileId));
  }, []);

  const handleFollow = async (friendId) => {
    try {
      const response = await axios.put(
        addFollow,
        { friendId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Barear ${token}`,
          },
        },
      );
      const updatedUserData = response.data;
      setFollowing(true);
      dispatch(setUserData({ user: updatedUserData }));
    } catch (err) {
      console.log("error occurred while handling follow");
    }
  };

  const handleUnFollow = async (friendId) => {
    try {
      axios
        .put(
          unfollow,
          { unfollowid: friendId },
          {
            headers: {
              Authorization: `Barear ${token}`,
            },
          },
        )
        .then((response) => {
          const updatedUserData = response.data;
          dispatch(setUserData({ user: updatedUserData }));
          setFollowing(false);
        });
    } catch (err) {
      console.log("error occurred while handling unfollow");
    }
  };

  return (
    <div className="h-full bg-gray-50 py-6 px-4">
      <div className="h-full mx-auto overflow-auto">
        <div className="relative h-72 rounded-3xl overflow-hidden shadow-xl bg-gradient-to-r from-slate-900 via-cyan-700 to-blue-600">
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200"
            alt="cover"
            className="w-full h-full object-cover opacity-40"
          />

          <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col md:flex-row md:items-end md:justify-between">
            <div className="flex items-end gap-5">
              <ProfilePic
                profilePic={profileUser?.profilePic}
                userName={profileUser?.userName}
                profileId={profileUser?._id}
              />
              <div className="text-white pb-2">
                <h1 className="text-3xl font-bold">{profileUser?.userName}</h1>

                <p className="text-sm text-white/80 mt-1 max-w-md">
                  {profileUser?.bio || "No bio added yet"}
                </p>
              </div>
            </div>

            <div className="mt-4 md:mt-0 flex gap-3">
              {userData._id !== profileId ? (
                <>
                  {!Following ? (
                    <button
                      onClick={() => handleFollow(profileId)}
                      className="bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2 rounded-xl font-medium transition"
                    >
                      Follow
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUnFollow(profileId)}
                      className="bg-white text-gray-800 px-5 py-2 rounded-xl font-medium hover:bg-gray-100 transition"
                    >
                      Following
                    </button>
                  )}

                  <button
                    onClick={() => {
                      handleChat(
                        token,
                        userData._id,
                        profileId,
                        conversation,
                        chat,
                        dispatch,
                      ).then(() => navigate("/chat"));
                    }}
                    className="bg-slate-900 hover:bg-black text-white px-5 py-2 rounded-xl font-medium transition"
                  >
                    Message
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsModal(true)}
                  className="bg-white text-gray-800 px-5 py-2 rounded-xl font-medium hover:bg-gray-100 transition"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-white rounded-2xl p-5 shadow-sm text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              {posts?.length || 0}
            </h2>
            <p className="text-gray-500 mt-1">Posts</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              {followers?.length || 0}
            </h2>
            <p className="text-gray-500 mt-1">Followers</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              {followings?.length || 0}
            </h2>
            <p className="text-gray-500 mt-1">Following</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm mt-6 p-3 flex gap-3 overflow-x-auto">
          <button
            onClick={() => setTab("posts")}
            className={
              tab === "posts"
                ? "bg-cyan-500 text-white px-5 py-2 rounded-xl whitespace-nowrap"
                : "bg-gray-100 hover:bg-gray-200 px-5 py-2 rounded-xl whitespace-nowrap"
            }
          >
            Posts
          </button>

          <button
            onClick={() => setTab("images")}
            className={
              tab === "images"
                ? "bg-cyan-500 text-white px-5 py-2 rounded-xl whitespace-nowrap"
                : "bg-gray-100 hover:bg-gray-200 px-5 py-2 rounded-xl whitespace-nowrap"
            }
          >
            Photos
          </button>

          <button
            onClick={() => setTab("followers")}
            className={
              tab === "followers"
                ? "bg-cyan-500 text-white px-5 py-2 rounded-xl whitespace-nowrap"
                : "bg-gray-100 hover:bg-gray-200 px-5 py-2 rounded-xl whitespace-nowrap"
            }
          >
            Followers
          </button>

          <button
            onClick={() => setTab("followings")}
            className={
              tab === "followings"
                ? "bg-cyan-500 text-white px-5 py-2 rounded-xl whitespace-nowrap"
                : "bg-gray-100 hover:bg-gray-200 px-5 py-2 rounded-xl whitespace-nowrap"
            }
          >
            Following
          </button>
        </div>

        <div className="mt-6">
          {tab === "posts" && (
            <Feed
              Profileposts={posts}
              profileId={profileId}
              render={render}
              forceRender={forceRender}
              isMypost={true}
            />
          )}

          {tab === "images" && (
            <Images
              images={posts
                .filter((post) => post.image)
                .map((post) => post.image)}
            />
          )}

          {tab === "followers" && (
            <Friends
              forceRender={forceRender}
              render={render}
              data={followers}
              type={"followers"}
            />
          )}

          {tab === "followings" && (
            <Friends data={followings} type={"followings"} />
          )}
        </div>

        {isModal && <EditProfile setIsModal={setIsModal} />}
      </div>
    </div>
  );
};
export default ProfileMainPost;
