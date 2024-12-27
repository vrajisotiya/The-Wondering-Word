import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());
      navigate("/");
    });
  };
  return (
    <button
      className="px-4 py-2 text-sm font-medium transition duration-200 rounded-full hover:bg-blue-500 hover:text-white focus:ring-2 focus:ring-blue-300 focus:outline-none"
      onClick={logoutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
