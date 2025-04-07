import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const Home = () => {
  const { user, isAuthenticated } = useContext(AuthContext);

  return (
    <>
      <h1>Home</h1>
    </>
  );
};

export default Home;
