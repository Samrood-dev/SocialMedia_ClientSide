import React, { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { addFollow, unfollow } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../state/userReducer";
import { imageUrl } from "../../icons/icons";
import { Link } from "react-router-dom";

const FriendInfo = ({ id, userName, profilePic, name }) => {
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);

  const [Following, setFollowing] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setFollowing(user.followings.includes(id));
  }, [user, id]);

  // FOLLOW
  const handleFollow = async (friendId) => {
    try {
      const response = await axios.put(
        addFollow,
        { friendId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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

  // UNFOLLOW
  const handleUnFollow = async (friendId) => {
    try {
      axios
        .put(
          unfollow,
          { unfollowid: friendId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
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
    <div
      className="
        flex
        items-center
        justify-between
        rounded-2xl
        p-3
        transition-all
      "
    >
      {/* LEFT */}
      <Link to={`/othersprofile/${id}`} className="flex items-center gap-3">
        {profilePic ? (
          <img
            src={profilePic}
            alt="profile"
            className="
              h-12
              w-12
              rounded-full
              object-cover
              border
              border-gray-200
            "
          />
        ) : (
          <img
            src={imageUrl}
            alt="profile"
            className="
              h-12
              w-12
              rounded-full
              object-cover
              border
              border-gray-200
            "
          />
        )}

        <div>
          <h3 className="text-sm font-semibold text-gray-800">{userName}</h3>

          <p className="text-xs text-gray-500">{name}</p>
        </div>
      </Link>

      {/* RIGHT */}
      <div>
        {!Following && user.followers.includes(id) && (
          <button
            className="
              rounded-xl
              bg-cyan-500
              px-4
              py-2
              text-sm
              font-medium
              text-white
              transition-all
              hover:bg-cyan-600
            "
            onClick={() => handleFollow(id)}
          >
            Follow Back
          </button>
        )}

        {!Following && !user.followers.includes(id) && (
          <button
            className="
              rounded-xl
              bg-cyan-500
              px-4
              py-2
              text-sm
              font-medium
              text-white
              transition-all
              hover:bg-cyan-600
            "
            onClick={() => handleFollow(id)}
          >
            Follow
          </button>
        )}

        {Following && (
          <button
            className="
              rounded-xl
              border
              border-gray-300
              bg-gray-100
              px-4
              py-2
              text-sm
              font-medium
              text-gray-700
              transition-all
              hover:bg-gray-200
            "
            onClick={() => handleUnFollow(id)}
          >
            Following
          </button>
        )}
      </div>
    </div>
  );
};

export default FriendInfo;
