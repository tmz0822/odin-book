import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import PostList from "../components/PostList";
import UserList from "../components/UserList";

const Home = () => {
  const { user, isAuthenticated } = useContext(AuthContext);

  return (
    <div className="flex">
      {/* Show posts */}
      <PostList />
      <UserList />
    </div>
  );
};

export default Home;
