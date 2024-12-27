import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="group">
      <div className="w-full bg-white rounded-lg  overflow-hidden transform transition duration-300 hover:scale-105">
        <div className="w-full ">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="w-full h-full object-cover "
          />
        </div>
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
