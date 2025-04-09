import { useContext, useState } from 'react';
import { postService } from '../../services/postService';
import { formatPostDate } from '../../utils/date';
import { AuthContext } from '../../contexts/AuthContext';
import CommentForm from '../comment/CommentForm';
import { commentService } from '../../services/commentService';

const Post = ({ post, updatePosts }) => {
  const [isLiked, setIsLiked] = useState(post.isLiked);
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [showComment, setShowComment] = useState(false);

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

  async function handleComment(postId, commentData) {
    const data = await commentService.addComment(postId, commentData);

    const updatedPost = {
      ...post,
      comments: [data.comment, ...post.comments],
      commentCount: post.commentCount + 1,
    };

    if (data.success) {
      updatePosts(updatedPost);
      setShowComment(false);
    }
  }

  return (
    <div className="bg-white px-4 pt-3 pb-2 shadow rounded-2xl mb-4">
      {/* Post */}
      <div className="flex flex-col gap-2">
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
            {post.commentCount} {post.commentCount > 1 ? 'comments' : 'comment'}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-1 border-t-1 border-gray-300">
          <button
            className={`my-1 flex-1 cursor-pointer rounded-sm p-1 transition-colors duration-200 hover:bg-amber-200 ${
              isLiked && 'bg-amber-100'
            }`}
            onClick={handleLike}
          >
            Like
          </button>
          <button
            className="my-1 flex-1 cursor-pointer rounded-sm p-1 transition-colors duration-200 hover:bg-amber-100"
            onClick={() => setShowComment(true)}
          >
            Comment
          </button>
          <button className="my-1 flex-1 cursor-pointer rounded-sm p-1 transition-colors duration-200 hover:bg-amber-100">
            Share
          </button>
        </div>
      </div>

      {/* Comment */}
      {showComment && (
        <div className="border-t-1 border-gray-300">
          <CommentForm handleComment={handleComment} post={post} />
        </div>
      )}
    </div>
  );
};

export default Post;

