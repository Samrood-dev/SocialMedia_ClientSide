import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { getAllusers } from "../../state/apiCalls";
import { setLogout } from "../../state/userReducer";

import { imageUrl } from "../../icons/icons";

import { Search, PlusSquare, Heart, MessageCircle } from "lucide-react";

const Navbar = () => {
  const userData = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Search states
  const [searchitem, setSearchItem] = useState("");
  const [allUsers, setAllusers] = useState([]);
  const [filterUsers, setFilterUsers] = useState([]);

  // Dropdown menu state
  const [isOpen, setIsOpen] = useState(false);

  // Fetch all users
  const allusers = async () => {
    const users = await getAllusers(token);
    setAllusers(users);
  };

  useEffect(() => {
    allusers();
  }, []);

  // Handle search input
  const handleSearch = (e) => {
    setSearchItem(e.target.value.toLowerCase());
  };

  // Filter users
  useEffect(() => {
    const users = allUsers.filter((user) => {
      return (
        user?.userName?.toLowerCase().includes(searchitem) &&
        user._id !== userData._id
      );
    });

    setFilterUsers(users);
  }, [searchitem]);

  // Logout
  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/login");
  };

  return (
    <div className="w-full bg-white border-b sticky top-0 z-50">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
        <h1
          onClick={() => navigate("/")}
          className="text-xl font-bold cursor-pointer"
        >
          Instagram
        </h1>

        <div className="hidden md:flex relative">
          <div className="flex items-center bg-gray-100 px-3 py-1 rounded-lg">
            <Search size={18} className="text-gray-500" />
            <input
              value={searchitem}
              onChange={handleSearch}
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none px-2 text-sm"
            />
          </div>

          {filterUsers.length > 0 && searchitem !== "" && (
            <ul className="absolute top-12 left-0 w-full bg-white border rounded-lg shadow-md overflow-hidden">
              {filterUsers.map((user) => (
                <li
                  key={user._id}
                  className="flex items-center gap-3 p-2 hover:bg-gray-100 cursor-pointer"
                >
                  <img
                    src={user.profilePic || imageUrl}
                    className="w-10 h-10 rounded-full object-cover"
                    alt=""
                  />

                  <Link
                    to={`/othersprofile/${user._id}`}
                    onClick={() => setSearchItem("")}
                    className="flex flex-col"
                  >
                    <span className="font-semibold text-sm">
                      {user.userName}
                    </span>
                    <span className="text-xs text-gray-500">{user.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ✅ Icons */}
        <div className="flex items-center gap-4">
          <PlusSquare className="cursor-pointer" />

          <Heart
            className="cursor-pointer"
            onClick={() => navigate("/notifications")}
          />

          <MessageCircle
            className="cursor-pointer"
            onClick={() => navigate("/chat")}
          />

          {/* Profile Image */}
          <div className="relative">
            <img
              src={userData?.profilePic || imageUrl}
              alt="profile"
              onClick={() => setIsOpen(!isOpen)}
              className="w-9 h-9 rounded-full object-cover cursor-pointer border"
            />

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute right-0 mt-3 w-44 bg-white border rounded-xl shadow-lg overflow-hidden">
                <p
                  onClick={() => navigate(`/profile/${userData._id}`)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  Profile
                </p>

                <p
                  onClick={handleLogout}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
                >
                  Logout
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ✅ Mobile Search */}
      <div className="md:hidden px-4 pb-3">
        <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg">
          <Search size={18} className="text-gray-500" />
          <input
            value={searchitem}
            onChange={handleSearch}
            type="text"
            placeholder="Search"
            className="bg-transparent outline-none px-2 text-sm w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
