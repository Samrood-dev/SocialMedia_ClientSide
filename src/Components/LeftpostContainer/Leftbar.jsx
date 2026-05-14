import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { persistor } from "../../state/store";
import { setLogout } from "../../state/userReducer";

import {
  Home,
  Search,
  Compass,
  MessageCircle,
  Heart,
  PlusSquare,
  User,
  LogOut,
} from "lucide-react";
import ContentPost from "../ContentpostContainer/ContentPost";

const Leftbar = () => {
  const [openToCreate, setOpenToCreate] = useState(false);
  const userData = useSelector((state) => state.user);
  const location = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Sidebar Hover Expand
  const [expanded, setExpanded] = useState(false);

  // ✅ Menu Items (Removed Create Link)
  const menu = [
    { name: "Home", icon: <Home size={24} />, path: "/" },
    { name: "Search", icon: <Search size={24} />, path: "/search" },
    // { name: "Explore", icon: <Compass size={24} />, path: "/explore" },
    { name: "Messages", icon: <MessageCircle size={24} />, path: "/chat" },
    {
      name: "Notifications",
      icon: <Heart size={24} />,
      path: "/notifications",
    },
    {
      name: "Profile",
      icon: <User size={24} />,
      path: `/profile/${userData?._id}`,
    },
  ];

  return (
    <div
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className={`
        flex flex-col justify-between bg-transparent border-r
        transition-all duration-300
        ${expanded ? "w-56" : "w-20"}`}
    >
      <div className="space-y-2">
        {menu.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className={`flex m-3 items-center gap-4 px-4 py-3 rounded-lg transition
              ${
                location.pathname === item.path
                  ? "bg-transparent"
                  : "hover:bg-[#c3e6f5]"
              }
            `}
          >
            <div className="min-w-[30px] flex justify-center">{item.icon}</div>

            {expanded && (
              <span className="text-sm font-medium">{item.name}</span>
            )}
          </Link>
        ))}

        <button
          onClick={() => setOpenToCreate(true)}
          className="flex m-3 items-center gap-4 px-4 py-3 rounded-lg transition hover:bg-[#c3e6f5]"
        >
          <div className="min-w-[30px] flex justify-center">
            <PlusSquare size={24} />
          </div>

          {expanded && <span className="text-sm font-medium">Create</span>}
        </button>
        {openToCreate && <ContentPost setOpenToCreate={setOpenToCreate} />}
      </div>

      <button
        onClick={() => {
          dispatch(setLogout());
          persistor.purge();
          navigate("/");
        }}
        className="flex items-center gap-4 p-5 rounded-lg hover:text-red-400 transition w-full"
      >
        <div className="min-w-[30px] flex justify-center">
          <LogOut size={24} />
        </div>

        {expanded && <span className="text-sm font-medium">Logout</span>}
      </button>
    </div>
  );
};

export default Leftbar;
