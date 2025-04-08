import { useContext, useState } from "react";
import { postService } from "../services/postService";
import { formatPostDate } from "../utils/date";
import { AuthContext } from "../contexts/AuthContext";

const Post = ({ post }) => {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likeCount, setLikeCount] = useState(post.likeCount);

  const handleLike = async () => {
    try {
      const newIsLiked = !isLiked;

      setIsLiked(newIsLiked);
      setLikeCount((prev) => (newIsLiked ? prev + 1 : prev - 1));
      await postService.likePost(post.id);
    } catch (error) {
      // Rollback if failed
      setIsLiked((prev) => !prev);
      setLikeCount((prev) => (isLiked ? prev + 1 : prev - 1));
    }
  };

  return (
    <div className="mx-auto mb-4 flex w-full max-w-xl flex-col gap-2 rounded-2xl bg-white p-4 pb-0 shadow">
      {/* Header */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <img
          className="h-10 w-10 rounded-full object-cover"
          src={post.author.profile.picture}
          alt={post.author.username}
        />

        {/* Author */}
        <div>
          <div className="text-sm">
            {post.author.profile.firstName} {post.author.profile.lastName}
          </div>
          <div className="text-xs text-gray-500">
            {formatPostDate(post.createdAt)}
          </div>
        </div>
      </div>

      {/* Post Content */}
      <p>{post.content}</p>
      {/* Post image (optional) */}

      {/* Post likes and comments */}
      <div className="flex justify-between text-sm text-gray-600">
        <span>👍 {likeCount}</span>
        <span>
          {post.commentCount} {post.commentCount > 1 ? "comments" : "comment"}
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-1 border-t-1 border-gray-300">
        <button
          className={`my-1 flex-1 cursor-pointer rounded-sm p-1 transition-colors duration-200 hover:bg-amber-200 ${
            isLiked && "bg-amber-100"
          }`}
          onClick={handleLike}
        >
          Like
        </button>
        <button className="my-1 flex-1 cursor-pointer rounded-sm p-1 transition-colors duration-200 hover:bg-amber-100">
          Comment
        </button>
        <button className="my-1 flex-1 cursor-pointer rounded-sm p-1 transition-colors duration-200 hover:bg-amber-100">
          Share
        </button>
      </div>
    </div>
  );
};

export default Post;
