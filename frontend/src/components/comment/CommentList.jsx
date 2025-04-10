import Comment from './Comment';

const CommentList = ({ comments, hasMoreComments, fetchComments }) => {
  return (
    <div className="px-4 overflow-y-auto">
      <ul className="flex flex-col gap-2 ">
        {comments.map((comment) => (
          <li key={comment.id}>
            <Comment comment={comment} />
          </li>
        ))}
      </ul>

      <div className="text-center my-5">
        {hasMoreComments && (
          <button
            className="cursor-pointer text-blue-500 hover:underline"
            onClick={fetchComments}
          >
            Load more...
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentList;
