import { formatCommentDate } from '../../utils/date';

const Comment = ({ comment }) => {
  return (
    <div className="flex gap-2">
      {/* User avatar*/}
      <div className="h-9 w-9 shrink-0">
        <img
          className="w-full h-full rounded-full shadow-lg"
          src={comment.user.profile.picture}
          alt="user avatar"
        />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <div className="bg-amber-100 rounded-2xl p-2 pt-1 w-full">
          <span className="text-sm font-semibold">{`${comment.user.profile.firstName} ${comment.user.profile.lastName}`}</span>
          <p className="break-words">{comment.content}</p>
        </div>

        <span className="text-xs pl-2 text-gray-400">
          {formatCommentDate(comment.createdAt)}
        </span>
      </div>
    </div>
  );
};

export default Comment;
