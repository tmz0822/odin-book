import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const CommentForm = ({ handleComment, post }) => {
  const { currentUser } = useContext(AuthContext);

  const handleTextAreaHeight = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px `;
  };

  const handleSubmit = async (formData) => {
    const content = formData.get('content');

    console.log(content);

    await handleComment(post.id, { content });
  };

  return (
    <div className="pt-2 flex gap-4">
      <img
        className="w-9 h-9 rounded-full"
        src={currentUser.profile.picture}
        alt="User avatar"
      />
      <form
        className="flex-1 rounded-xl bg-gray-200 flex"
        action={handleSubmit}
      >
        <textarea
          className="resize-none w-full outline-none p-2 max-h-50"
          name="content"
          id="content"
          placeholder="Write your comment here..."
          onInput={handleTextAreaHeight}
        ></textarea>
        <button className="bg-amber-100 rounded-lg cursor-pointer p-1.5 self-end text-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 12h14m0 0l-6-6m6 6l-6 6"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
