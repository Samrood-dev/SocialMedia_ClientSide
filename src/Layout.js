import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Leftbar from "./Components/LeftpostContainer/Leftbar";

const Layout = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const location = useLocation();

  return (
    <div className="h-screen flex bg-gray-50">
      {/* // <div className="h-screen flex bg-[#000000]"> */}
      <Leftbar setOpenCreate={setOpenCreate} />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;

// import { useState } from "react";
// import { Outlet, useLocation } from "react-router-dom";
// import Leftbar from "./Components/LeftpostContainer/Leftbar";
// import Rightbar from "./Components/RightpostContainer/Rightbar";

// const Layout = () => {
//   const [openCreate, setOpenCreate] = useState(false);
//   const location = useLocation();

//   const hideRightbar =
//     location.pathname.startsWith("/profile") ||
//     location.pathname.startsWith("/chat") ||
//     location.pathname.startsWith("/notifications");

//   return (
//     <div className="h-screen bg-gray-50">
//       <div className="flex flex-row gap-6 px-4 pt-3">
//         {/* <div className="w-[100px]"> */}
//         <Leftbar setOpenCreate={setOpenCreate} />
//         {/* </div> */}

//         <div className="flex h-screen flex-row p-10 md:px-32 flex-1 gap-6">
//           <div className="w-full">
//             <Outlet />
//           </div>

//           {!hideRightbar && (
//             <div className="hidden lg:block min-w-[320px]">
//               <Rightbar />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Layout;
