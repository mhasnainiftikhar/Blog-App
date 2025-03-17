import React from 'react';
import { Link } from 'react-router-dom';
import appwriteService from '../appwrite/config';

function PostCard({ $id, title, featuredImage, createdAt }) {
  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-xl overflow-hidden transition-transform transform hover:scale-105 duration-300">
      {/* Image Section */}
      <Link to={`/post/${$id}`} className="block relative">
        <img
          src={appwriteService.getFilePreview(featuredImage)}
          alt={title}
          className="w-full h-48 object-cover rounded-t-xl"
          onError={(e) => (e.target.src = '/fallback-image.jpg')} // Fallback image
        />
      </Link>

      {/* Content Section */}
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2 truncate">{title}</h2>
        <p className="text-sm text-gray-500">Posted on {new Date(createdAt).toLocaleDateString()}</p>
      </div>

      {/* Button Section */}
      <div className="px-4 pb-4">
        <Link
          to={`/post/${$id}`}
          className="inline-block bg-blue-500 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-blue-600 transition-all"
        >
          Read More
        </Link>
      </div>
    </div>
  );
}

export default PostCard;
