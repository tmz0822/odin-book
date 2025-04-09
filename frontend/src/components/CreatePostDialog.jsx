import { useState } from 'react';
import Dialog from './reusable/Dialog';
import { postService } from '../services/postService';

const CreatePostDialog = ({ isOpen, onClose, handlePost }) => {
  const [error, setError] = useState('');

  async function post(formData) {
    const content = formData.get('content');

    if (!content || content.trim() === '') {
      setError('Must enter content.');
      return;
    }

    await handlePost({ content });
    setError('');
    onClose();
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      {/* Header */}
      <div className="p-4 border-b-1 border-b-gray-300">
        <h1 className="text-xl text-center font-semibold">Create Post</h1>
      </div>

      {/* Content */}
      <form className="p-4" action={post}>
        <textarea
          className="p-2 bg-gray-200 w-full resize-none min-h-50"
          name="content"
          id="content"
          placeholder="Post something interesting"
        ></textarea>

        {error && <p className="px-1 py-2 text-orange-600">{error}</p>}

        <button
          className="bg-amber-200 px-4 py-2 w-full rounded-full hover:bg-amber-300 disabled:bg-gray-200"
          type="submit"
        >
          Post
        </button>
      </form>
    </Dialog>
  );
};

export default CreatePostDialog;
