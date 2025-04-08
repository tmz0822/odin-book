import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import PostList from '../components/PostList';

const Home = () => {
  const { user, isAuthenticated } = useContext(AuthContext);

  return (
    <>
      {/* Show posts */}
      <h1>Home</h1>
      <PostList />
    </>
  );
};

export default Home;
