import React from "react";
import appwriteService from "../appwrite/Config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link
      to={`/post/${$id}`}
      className="block bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      <div className="w-full">
        {/* Image Wrapper */}
        <div className="w-full h-48 overflow-hidden">
          <img
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            onError={(e) => (e.target.src = "/placeholder-image.jpg")}
          />
        </div>
        {/* Content */}
        <div className="p-4">
          <h2 className="text-xl font-semibold text-gray-800 truncate">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
