import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };

  return (
    <button
      onClick={logoutHandler}
      className="px-6 py-2 font-semibold text-white bg-red-600 rounded-full transition-all duration-300 ease-in-out hover:bg-red-700 hover:scale-105 active:scale-95 shadow-md"
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
