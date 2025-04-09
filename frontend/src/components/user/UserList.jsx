import { useQuery } from '@tanstack/react-query';
import { userService } from '../../services/userService';
import User from './User';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

const UserList = () => {
  const { currentUser } = useContext(AuthContext);
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['users'],
    queryFn: userService.fetchUsers,
  });

  if (error) return 'An error has occurred: ' + error.message;

  if (isPending) return 'Loading...';

  return (
    <ul className="rounded-lg min-w-80 bg-white shadow-sm">
      {data.users.map(
        (user) =>
          currentUser.id !== user.id && (
            <li key={user.id}>
              <User user={user} />
            </li>
          )
      )}
    </ul>
  );
};

export default UserList;

