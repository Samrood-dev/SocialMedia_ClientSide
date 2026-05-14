import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContactList from "../ContactList/ContactList";
import { addChat, getAllusers } from "../../state/apiCalls";
import {
  setChat,
  setConversation,
  setCurrentChat,
} from "../../state/userReducer";
import { imageUrl } from "../../icons/icons";

const Contact = ({ currentUser }) => {
  const conversation = useSelector((state) => state.conversation);
  const userData = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const dispatch = useDispatch();

  const [searchitem, setSearchItem] = useState("");
  const [allUsers, setAllusers] = useState([]);
  const [filterUsers, setFilterUsers] = useState([]);

  // ================= GET USERS =================
  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getAllusers(token);
      setAllusers(users);
    };

    fetchUsers();
  }, [token]);

  useEffect(() => {
    if (searchitem.trim() === "") {
      setFilterUsers([]);
      return;
    }

    const users = allUsers?.filter((user) => {
      return (
        user?.userName?.toLowerCase().includes(searchitem.toLowerCase()) &&
        user._id !== userData._id
      );
    });

    setFilterUsers(users);
  }, [searchitem, allUsers, userData]);

  const handleChat = async (friendId) => {
    const response = await addChat(token, userData._id, friendId);
    console.log("🚀 ~ handleChat ~ response:", response);

    if (!response.chatExist) {
      const updatedConversation = [...conversation, response.chat];

      dispatch(setConversation(updatedConversation));
      dispatch(setCurrentChat(response.chat));
    } else {
      dispatch(setCurrentChat(response.chat));
    }

    dispatch(
      setChat({
        showContact: "hidden",
        showMessage: "block",
      }),
    );

    setSearchItem("");
    setFilterUsers([]);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="relative pt-3 pb-2">
        <input
          type="text"
          value={searchitem}
          onChange={(e) => setSearchItem(e.target.value)}
          placeholder="Search users..."
          className="
            w-full
            rounded-lg
            border
            border-[#34b6e4]
            bg-transparent
            px-5
            py-3
            pr-12 
            text-sm
            outline-none
            transition
            focus:border-cyan-500
            focus:ring-4
            focus:ring-cyan-100
          "
        />

        <div className="absolute right-7 top-1/2 -translate-y-1/2 text-gray-400">
          🔍
        </div>

        {/* SEARCH RESULTS */}
        {filterUsers?.length > 0 && (
          <div
            className="
              absolute
              w-full
              top-[60px]
              z-50
              overflow-hidden
              rounded-lg
              border
              border-gray-200
              bg-white
              shadow-xl
            "
          >
            {filterUsers.map((user) => (
              <div
                key={user._id}
                onClick={() => handleChat(user._id)}
                className="
                  flex
                  cursor-pointer
                  items-center
                  gap-3
                  px-4
                  py-3
                  transition
                  hover:bg-gray-50
                "
              >
                {user.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt="profile"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <img
                    src={imageUrl}
                    alt="profile"
                    className="h-12 w-12 rounded-full object-cover"
                  />
                )}

                <div>
                  <h3 className="font-semibold text-gray-800">
                    {user.userName}
                  </h3>

                  <p className="text-sm text-gray-500">{user.name}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto pb-3 custom-scrollbar">
        {conversation?.length > 0 ? (
          conversation.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                dispatch(setCurrentChat(item));

                dispatch(
                  setChat({
                    showMessage: "block",
                    showContact: "hidden",
                  }),
                );
              }}
              className="
                mb-2
                cursor-pointer
                rounded-lg
                transition
                hover:bg-[#c3e6f5]
              "
            >
              <ContactList conversation={item} currentUser={currentUser} />
            </div>
          ))
        ) : (
          <div className="flex h-full items-center justify-center py-5">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-100 text-2xl">
                💬
              </div>

              <h3 className="text-lg font-semibold text-gray-700">
                No Conversations
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Search users and start chatting.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
