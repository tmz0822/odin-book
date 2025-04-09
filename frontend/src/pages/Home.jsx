import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import PostList from '../components/PostList';
import UserList from '../components/UserList';

const Home = () => {
  const { currentUser, isAuthenticated } = useContext(AuthContext);

  return (
    <div className="flex">
      {/* Middle */}

      <PostList />

      {/* Right sidebar */}
      <UserList />
    </div>
  );
};

export default Home;

