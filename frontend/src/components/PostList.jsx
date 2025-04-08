import { useCallback, useEffect, useRef, useState } from 'react';
import { postService } from '../services/postService';
import Post from './Post';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef();

  const fetchPosts = useCallback(
    async (cursor) => {
      if (loading || !hasMore) return;

      setLoading(true);
      try {
        const data = await postService.fetchPosts(cursor);

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

  useEffect(() => {
    fetchPosts();

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return (
    <ul>
      {posts.map((post, index) => {
        if (index === posts.length - 1) {
          return (
            <li key={post.id} ref={lastPostRef}>
              <Post post={post} />
            </li>
          );
        } else {
          return (
            <li key={post.id}>
              <Post post={post} />
            </li>
          );
        }
      })}

      {loading && <p>Loading...</p>}

      {!hasMore && !loading && <p>No more posts to load</p>}
    </ul>
  );
};

export default PostList;
