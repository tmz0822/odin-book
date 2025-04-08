import { formatPostDate } from '../utils/date';

const Post = ({ post }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-4 pb-0 mb-4 max-w-xl w-full mx-auto flex flex-col gap-2">
      {/* Header */}
      <div className="flex gap-4 items-center">
        {/* Avatar */}
        <img
          className="w-10 h-10 rounded-full object-cover"
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
        <span>👍 {post._count.likes}</span>
        <span>
          {post._count.comments}{' '}
          {post._count.comments > 1 ? 'comments' : 'comment'}
        </span>
      </div>

      {/* Actions */}
      <div className="flex border-t-1 border-gray-300">
        <button className="flex-1 p-1 my-1 rounded-sm cursor-pointer transition-colors duration-200 hover:bg-amber-100">
          Like
        </button>
        <button className="flex-1 p-1 my-1 rounded-sm cursor-pointer transition-colors duration-200 hover:bg-amber-100">
          Comment
        </button>
        <button className="flex-1 p-1 my-1 rounded-sm cursor-pointer transition-colors duration-200 hover:bg-amber-100">
          Share
        </button>
      </div>
    </div>
  );
};

export default Post;
