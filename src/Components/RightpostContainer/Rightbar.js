import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { suggessions } from "../../utils/constants";
import axios from "../../utils/axios";
import { setAllUsers } from "../../state/userReducer";
import { imageUrl } from "../../icons/icons";
import FriendInfo from "../smallComponants/FriendInfo";

const Rightbar = () => {
  const token = useSelector((state) => state.token);
  const users = useSelector((state) => state.users);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(suggessions, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        dispatch(
          setAllUsers({
            users: response.data.data,
          }),
        );
      } catch (err) {
        console.log(err);
      }
    };

    fetchUsers();
  }, [dispatch, token]);

  return (
    <div className="hidden bg-transparent md:block h-full min-w-[340px]">
      <div className="border-b border-gray-100 p-5">
        <h2 className="text-xl font-bold text-gray-800">Suggestions For You</h2>

        <p className="mt-1 text-sm text-gray-500">
          Discover and connect with people
        </p>
      </div>

      <div className="max-h-[500px] overflow-y-auto custom-scrollbar p-3">
        {users?.length > 0 ? (
          <div className="space-y-3">
            {users.map((user) => (
              <FriendInfo
                key={user._id}
                id={user._id}
                profilePic={user.profilePic}
                name={user.name}
                userName={user.userName}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div
              className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-full
                  bg-cyan-100
                  text-2xl
                "
            >
              👥
            </div>

            <h3 className="mt-4 text-lg font-semibold text-gray-700">
              No Suggestions
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Suggestions will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rightbar;
