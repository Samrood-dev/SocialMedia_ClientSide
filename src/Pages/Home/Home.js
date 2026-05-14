import Feed from "../../Components/PostContainer/Feed";
import Rightbar from "../../Components/RightpostContainer/Rightbar";
export default function Home() {
  return (
    <>
      {/* <Navbar /> */}
      <div className="flex h-full">
        <div className="flex-1 overflow-auto flex justify-center">
          <Feed />
        </div>
        <Rightbar />
      </div>
    </>
  );
}
