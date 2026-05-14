export const getBaseUrl = (isSocket) => {
  if (location.hostname === "localhost") {
    return "http://localhost:3001/api";
  } else if (isSocket) {
    return "wss://social-media-server-side-one.vercel.app/api";
  } else {
    return "https://social-media-server-side-one.vercel.app/api";
  }
};

export const loginPost = "/login";
export const signupPost = "/signup";
export const addProfilePic = "/add-profilepic";
export const verifyEmail = "/verify-email";
export const forgotPassword = "/forgot-password";
export const resetPassword = "/reset-password";
export const addPost = "/add-post";
export const getPosts = "/followings-posts";
export const deletePost = "/delete-post";
export const updatePost = "/update-post";
export const reportPost = "/report-post";
export const editProfile = "/edit-profile";
export const suggessions = "/suggessions";
export const profileUser = "/get-user";
export const allUsers = "/all-users";
export const addFollow = "/add-friend";
export const removeFollow = "/un-follow";
export const getFrieds = "/getFriends";
export const unfollow = "/un-follow";
export const unFriend = "/remove-follower";
export const getMyPosts = "/get-mypost";
export const notification = "/all-notifications";
export const conversations = "/chats";
export const googleLogin = "/google-login";
