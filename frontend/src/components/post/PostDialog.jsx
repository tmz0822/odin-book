import { useEffect, useState } from 'react';
import Dialog from '../common/Dialog';
import Post from './Post';
import { commentService } from '../../services/commentService';
import CommentList from '../comment/CommentList';

const PostDialog = ({ post, isOpen, onClose }) => {
  const [comments, setComments] = useState([]);
  const [meta, setMeta] = useState({ total: 0, page: 1, totalPages: 0 });
  const [loading, setLoading] = useState(false);
  const hasMoreComments = meta.page < meta.totalPages;

  // Fetch post comments
  const fetchComments = async () => {
    setLoading(true);
    try {
      const result = await commentService.fetchPostComments(post.id, meta.page);

      setComments((prevComments) => [...prevComments, ...result.data]);

      // setMeta((prevMeta) => ({
      //   ...prevMeta,
      //   total: result.meta.total,
      //   page: prevMeta.page + 1,
      //   totalPages: result.meta.totalPages,
      // }));

      setMeta(result.meta);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchComments();
    }
  }, [post.id, isOpen]);

  console.log(comments);
  console.log(hasMoreComments);
  console.log(meta.page, meta.totalPages);

  return (
    <Dialog
      isOpen={isOpen}
      onClose={onClose}
      title={`${post.author.profile.firstName} ${post.author.profile.lastName}'s post`}
    >
      <Post post={post} />

      {/* Comments */}

      <span className="mx-4 mb-4 border-t-1 border-gray-300"></span>
      <CommentList
        comments={comments}
        hasMoreComments={hasMoreComments}
        fetchComments={fetchComments}
      />
    </Dialog>
  );
};

export default PostDialog;
