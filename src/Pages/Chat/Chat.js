import React, { useEffect, useState } from "react";
import Contact from "../../Components/Contact/Contact";
import ChatContainer from "../../Components/ChatContainer/ChatContainer";
import { useDispatch, useSelector } from "react-redux";
import { conversations } from "../../utils/constants";
import axios from "../../utils/axios";
import { setConversation } from "../../state/userReducer";

const Chat = () => {
  const currentChat = useSelector((state) => state.currentChat);
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const chat = useSelector((state) => state.chat);

  const dispatch = useDispatch();

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const response = await axios.get(`${conversations}/${user._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        dispatch(setConversation(response.data));
      } catch (err) {
        console.log(err);
      }
    };

    if (user?._id && token) {
      getConversations();
    }
  }, [user?._id, token]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await axios.get(`/messages/${currentChat?._id}`);

        setMessages(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    if (currentChat?._id) {
      getMessages();
    }
  }, [currentChat]);

  return (
    <div className="flex h-full">
      <div
        className={`
            ${chat.showContact}
            md:block
            flex-col
            border-r
            border-gray-200
            bg-transparent
            h-full
            min-w-[340px]
            p-4
          `}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Messages</h1>

            <p className="text-sm text-gray-500 mt-1">Chat with your friends</p>
          </div>

          <img
            src={user?.profilePic}
            alt="profile"
            className="w-12 h-12 rounded-full object-cover border-2 border-cyan-500"
          />
        </div>

        <Contact currentUser={user} />
      </div>

      <div
        className={`
            ${chat.showMessage}
            md:block
            h-full
            w-full
          `}
      >
        {currentChat ? (
          <ChatContainer
            messages={messages}
            setMessages={setMessages}
            currentChat={currentChat}
          />
        ) : (
          <div
            className={`
            ${chat.showMessage}
            md:flex
            justify-center
            items-center
            text-center
            h-full
            w-full
          `}
          >
            <div>
              <div className="flex h-28 w-28 mx-auto items-center justify-center rounded-full bg-cyan-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-12 w-12 text-cyan-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.27 3.293.33.433.023.83.246 1.11.577l2.052 2.435c.89 1.056 2.583 1.056 3.473 0l2.052-2.435c.28-.331.677-.554 1.11-.577a48.11 48.11 0 003.293-.33c1.584-.233 2.707-1.626 2.707-3.227V6.741c0-1.6-1.123-2.994-2.707-3.227A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.514C3.373 3.747 2.25 5.14 2.25 6.741v6.018z"
                  />
                </svg>
              </div>

              <h2 className="mt-6 text-3xl font-bold text-gray-800">
                Your Messages
              </h2>

              <p className="mt-3 text-gray-500 leading-relaxed">
                Select a conversation and start chatting with your friends in
                real time.
              </p>

              <button className="mt-7 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:scale-[1.02]">
                Start Chatting
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
