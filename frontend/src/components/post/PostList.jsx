import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { postService } from '../../services/postService';
import Post from './Post';
import { AuthContext } from '../../contexts/AuthContext';
import CreatePostDialog from './CreatePostDialog';
import { commentService } from '../../services/commentService';

const PostList = () => {
  const { currentUser } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const [showCreatePostDialog, setShowCreatePostDialog] = useState(false);

  function closeCreatePostDialog() {
    setShowCreatePostDialog(false);
  }

  async function handlePost(postData) {
    const data = await postService.createPost(postData);

    setPosts((prevPosts) => [data.post, ...prevPosts]);
  }

  useEffect(() => {
    fetchPosts();

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  const fetchPosts = useCallback(
    async (cursor) => {
      if (loading || !hasMore) return;

      setLoading(true);
      try {
        const data = await postService.fetchPosts(cursor);
        console.log(data);

        setPosts((prevPosts) =>
          cursor ? [...prevPosts, ...data.posts] : data.posts
        );
        setNextCursor(data.pagination.nextCursor);
        setHasMore(data.pagination.hasMore);
      } catch (error) {
        console.error('Failed to load posts', error);
      } finally {
        setLoading(false);
      }
    },
    [loading, hasMore]
  );

  const lastPostRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            console.log('Next cursor: ', nextCursor);
            fetchPosts(nextCursor);
          }
        },
        {
          rootMargin: '200px',
        }
      );

      if (node) observer.current.observe(node);
    },

    [loading, hasMore, nextCursor, fetchPosts]
  );

  const updatePosts = (updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
  };

  return (
    <div className="flex flex-col flex-1 justify-center items-center">
      {/* Open add post dialog */}
      <div className="flex gap-4 p-6 bg-white max-w-xl w-full mb-4 rounded-2xl">
        <img
          className="w-10 h-10 rounded-full"
          src={currentUser.profile.picture}
          alt="User avatar"
        />

        <button
          className="bg-gray-100 w-full rounded-full hover:bg-gray-200 text-left px-4 text-gray-700 hover:text-gray-900 transition-colors duration-200 cursor-pointer"
          onClick={() => setShowCreatePostDialog(true)}
        >
          Click me to add a post
        </button>
      </div>
      <CreatePostDialog
        isOpen={showCreatePostDialog}
        onClose={closeCreatePostDialog}
        handlePost={handlePost}
      />
      {/* Show posts */}
      <ul className="max-w-xl w-full">
        {posts.map((post, index) => {
          if (index === posts.length - 1) {
            return (
              <li key={post.id} ref={lastPostRef}>
                <Post
                  className="shadow mb-4 rounded-2xl"
                  post={post}
                  updatePosts={updatePosts}
                />
              </li>
            );
          } else {
            return (
              <li key={post.id}>
                <Post
                  className="shadow mb-4 rounded-2xl"
                  post={post}
                  updatePosts={updatePosts}
                />
              </li>
            );
          }
        })}
        {loading && <p>Loading...</p>}
        {!hasMore && !loading && <p>No more posts to load</p>}
      </ul>
    </div>
  );
};

export default PostList;

