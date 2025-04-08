import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { followService } from '../services/followService';

const User = ({ user }) => {
  const { currentUser } = useContext(AuthContext);

  const fullName = `${user.profile.firstName} ${user.profile.lastName}`;

  const [isPending, setIsPending] = useState(
    currentUser.sentFollowRequests.some(
      (request) =>
        request.receiverId === user.id && request.status === 'PENDING'
    )
  );

  const [isFollowing, setIsFollowing] = useState(
    currentUser.followers.some(
      (follow) =>
        follow.followerId === currentUser.id && follow.followingId === user.id
    )
  );

  const [hasIncomingRequest, setHasIncomingRequest] = useState(
    currentUser.receivedFollowRequests.some(
      (request) => request.senderId === user.id && request.status === 'PENDING'
    )
  );

  const handleFollow = async () => {
    try {
      const response = await followService.fetchSendFollowRequest(user.id);
      if (response.success) {
        setIsPending(true);
      }
    } catch (error) {
      setIsPending(false);
    }
  };

  const handleUnfollow = async () => {
    try {
      setIsFollowing(false);
      await followService.fetchUnfollow(user.id);
    } catch (error) {
      setIsFollowing(true);
      console.error(error);
    }
  };

  const handleRequest = async (accepted) => {
    const followRequest = currentUser.receivedFollowRequests.find(
      (request) => request.senderId === user.id
    );
    try {
      setHasIncomingRequest(false);
      await followService.fetchUpdateFollowRequest(
        user.id,
        followRequest.id,
        accepted ? 'ACCEPTED' : 'REJECTED'
      );
    } catch (error) {
      setHasIncomingRequest(true);
    }
  };

  return (
    <div className="flex items-center gap-4 p-2 rounded-lg hover:bg-amber-200 transition-colors duration-200">
      <div className="h-10 w-10 overflow-hidden">
        <img
          className="rounded-full"
          src={user.profile.picture}
          alt={`${fullName}'s avatar`}
        />
      </div>

      <div className="flex flex-col gap-1 flex-1">
        <a className="font-semibold">{fullName}</a>

        {/* Buttons for accept/reject follow */}
        {hasIncomingRequest && (
          <div className="flex gap-3">
            <button
              className="flex-1 bg-green-400 cursor-pointer hover:bg-green-500"
              onClick={() => handleRequest(true)}
            >
              <svg
                className="mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="white"
                viewBox="0 0 24 24"
              >
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            </button>
            <button
              className="flex-1 bg-red-400 cursor-pointer hover:bg-red-500"
              onClick={() => handleRequest(false)}
            >
              <svg
                className="mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="white"
                viewBox="0 0 24 24"
              >
                <path d="M18.3 5.71L12 12l6.3 6.29-1.42 1.42L12 13.41l-6.29 6.3-1.42-1.42L10.59 12 4.29 5.71 5.71 4.29 12 10.59l6.29-6.3z" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* Buttons for follow/unfollow */}
      {isFollowing ? (
        <button
          className="relative group cursor-pointer bg-blue-200 px-1 py-2 max-w-20 w-full text-sm  hover:bg-red-300 rounded-lg  disabled:bg-gray-200 disabled:hover:cursor-not-allowed"
          onClick={handleUnfollow}
        >
          <span className="group-hover:opacity-0 ">Following</span>
          <span className="absolute inset-0 opacity-0 flex items-center justify-center group-hover:opacity-100 ">
            Unfollow
          </span>
        </button>
      ) : (
        <button
          className="cursor-pointer bg-green-200 px-1 py-2 max-w-20 w-full text-sm  hover:bg-green-300 rounded-lg disabled:bg-gray-200 disabled:hover:cursor-not-allowed"
          disabled={isPending}
          onClick={handleFollow}
        >
          {isPending ? 'Sent' : 'Follow'}
        </button>
      )}
    </div>
  );
};

export default User;

