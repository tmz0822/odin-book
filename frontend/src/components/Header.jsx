import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

import logo from "../assets/logo.png";

const Header = () => {
  const { user } = useContext(AuthContext);

  console.log(user);

  return (
    <header className="flex h-full max-h-20 items-center bg-neutral-400">
      {/* Left */}
      <div className="flex items-center">
        <img
          className="h-20 w-20 object-fill"
          src={logo}
          alt="Socialize Logo"
        />
        <h1 className="text-2xl font-bold">Socialize</h1>
      </div>
      {/* Middle */}
      <nav className="flex-1"></nav>
      {/* Right(user avatar) */}
      <div className="mr-4 flex items-center gap-4">
        <div className="gap flex h-10 w-10">
          <img
            className="w-full rounded-full object-cover"
            src={user.profile.picture}
            alt=""
          />
        </div>
        <h1 className="font-semibold">
          {user.profile.firstName} {user.profile.lastName}
        </h1>
      </div>
    </header>
  );
};

export default Header;
