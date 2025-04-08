const User = ({ user }) => {
  const fullName = `${user.profile.firstName} ${user.profile.lastName}`;
  return (
    <div className="flex justify-between p-2">
      <div className="flex items-center gap-4">
        <div className="h-10 w-10 overflow-hidden">
          <img
            className="rounded-full"
            src={user.profile.picture}
            alt={`${fullName}'s avatar`}
          />
        </div>
        <a className="font-semibold">{fullName}</a>
      </div>

      <button className="cursor-pointer bg-green-200 px-3 py-2">Follow</button>
    </div>
  );
};

export default User;
