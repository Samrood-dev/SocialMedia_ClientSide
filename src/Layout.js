import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Leftbar from "./Components/LeftpostContainer/Leftbar";

const Layout = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const location = useLocation();

  return (
    <div className="h-screen flex bg-gray-50">
      {/* <Navbar /> */}
      <Leftbar setOpenCreate={setOpenCreate} />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
