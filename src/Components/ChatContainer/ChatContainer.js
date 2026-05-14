import React, { useEffect, useRef, useState } from "react";
import ChatBox from "../ChatBox/ChatBox";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../utils/axios";
import io from "socket.io-client";
import { getUser } from "../../state/apiCalls";
import { imageUrl, SubmitIcon } from "../../icons/icons";
import { BiArrowBack } from "react-icons/bi";
import { setChat } from "../../state/userReducer";
import { getBaseUrl } from "../../utils/constants";

const url = getBaseUrl(true);
const socket = io.connect(url);
const ChatContainer = ({ messages, currentChat, setMessages }) => {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const [newMessage, setNewMessage] = useState("");
  const [friend, setFriend] = useState();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const dispatch = useDispatch();
  const scrollRef = useRef();
  useEffect(() => {
    socket?.emit("addUser", user._id);
  }, [user]);
  useEffect(() => {
    socket?.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);
  const getUserInfo = async () => {
    const friendId = currentChat.members.find((member) => member !== user._id);
    const response = await getUser(token, friendId);
    setFriend(response);
  };
  useEffect(() => {
    arrivalMessage &&
      currentChat.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
    getUserInfo();
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      senderId: user._id,
      text: newMessage,
      chatId: currentChat._id,
    };
    const recieverId = currentChat.members.find(
      (member) => member !== user._id,
    );
    socket?.emit("sendMessage", {
      senderId: user._id,
      text: newMessage,
      recieverId: recieverId,
    });

    try {
      const response = await axios.post(
        "/messages",
        { message },
        {
          headers: {
            Authorization: `Barear ${token}`,
          },
        },
      );
      setMessages([...messages, response.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="h-full flex flex-col bg-gray-100">
      <div className="px-4 py-2 bg-white border-b flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <button
            className="md:hidden text-2xl text-gray-700"
            onClick={() => {
              dispatch(
                setChat({ showMessage: "hidden", showContact: "block" }),
              );
            }}
          >
            <BiArrowBack />
          </button>

          <div className="relative">
            {friend?.profilePic ? (
              <img
                className="w-12 h-12 rounded-full object-cover border-2 border-cyan-500"
                src={friend?.profilePic}
                alt="profilepic"
              />
            ) : (
              <img
                src={imageUrl}
                className="w-12 h-12 rounded-full object-cover border-2 border-cyan-500"
                alt="profile"
              />
            )}

            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 text-base">
              {friend?.name}
            </h3>

            <p className="text-sm text-green-500">Online</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button className="h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 transition">
            📞
          </button>

          <button className="h-10 w-10 rounded-full bg-gray-100 hover:bg-gray-200 transition">
            ⋮
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-3 bg-gradient-to-b from-gray-50 to-gray-100 hide-scrollbar">
        {messages.map((m, index) => (
          <div ref={scrollRef} key={index}>
            <ChatBox message={m} own={m.senderId === user._id} />
          </div>
        ))}
      </div>

      <div className="bg-white border-t px-3 py-3">
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <div className="flex-1 relative">
            <input
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
              className="w-full h-12 rounded-full border border-gray-300 bg-gray-50 px-5 pr-14 outline-none focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100 transition-all"
              type="text"
              placeholder="Type a message..."
            />

            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-500"
            >
              😊
            </button>
          </div>

          <button
            type="submit"
            className="h-12 w-12 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-all"
          >
            <SubmitIcon />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatContainer;
