import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { getNotifications } from "../../state/apiCalls";
import Notificationlist from "./Notificationlist";

const Notification = () => {
  const token = useSelector((state) => state.token);

  const [notification, setNotification] = useState([]);

  useEffect(() => {
    const fetchNotification = async () => {
      const response = await getNotifications(token);
      setNotification(response);
    };

    fetchNotification();
  }, [token]);

  return (
    <div className="h-screen overflow-scroll">
      <div
        className="
          mx-auto
          h-full
          overflow-hidden
          border
          border-gray-200
          shadow-xl
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-gray-200
            px-6
            py-5
          "
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>

            <p className="mt-1 text-sm text-gray-500">
              Stay updated with your latest activities
            </p>
          </div>

          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-cyan-100
            "
          >
            🔔
          </div>
        </div>

        <div className="h-[calc(100vh-96px)] overflow-y-auto p-4 custom-scrollbar">
          {notification?.length > 0 ? (
            <div className="space-y-3">
              {notification.map(
                ({ type, user, friend, content, postId, createdAt }, index) => (
                  <Notificationlist
                    key={index}
                    type={type}
                    createdAt={createdAt}
                    user={user}
                    friend={friend}
                    content={content}
                    post={postId}
                  />
                ),
              )}
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div
                className="
                  flex
                  h-24
                  w-24
                  items-center
                  justify-center
                  rounded-full
                  bg-gray-100
                  text-5xl
                "
              >
                🔔
              </div>

              <h2 className="mt-3 text-2xl font-bold text-gray-700">
                No Notifications
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                You're all caught up for now.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notification;
