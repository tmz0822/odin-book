import { useQuery } from "@tanstack/react-query";
import { userService } from "../services/userService";
import User from "./User";

const UserList = () => {
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ["users"],
    queryFn: userService.fetchUsers,
  });

  if (error) return "An error has occurred: " + error.message;

  if (isPending) return "Loading...";

  return (
    <ul className="min-w-80 rounded-lg bg-white p-2 shadow-sm">
      {data.users.map((user) => (
        <li key={user.id}>
          <User user={user} />
        </li>
      ))}
    </ul>
  );
};

export default UserList;
