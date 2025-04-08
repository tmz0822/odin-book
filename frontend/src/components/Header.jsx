import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

import logo from '../../public/logo.png';

const Header = () => {
  const { user } = useContext(AuthContext);

  console.log(user);

  return (
    <header className="bg-neutral-400 max-h-20 h-full flex items-center">
      {/* Left */}
      <div className="flex items-center">
        <img
          className="w-20 h-20 object-fill"
          src={logo}
          alt="Socialize Logo"
        />
        <h1 className="text-2xl font-bold">Socialize</h1>
      </div>
      {/* Middle */}
      <nav className="flex-1"></nav>
      {/* Right(user avatar) */}
      <div className="mr-4 flex items-center gap-4">
        <div className="w-10 h-10 flex gap">
          <img
            className="object-cover rounded-full w-full"
            src={user.profile.picture}
            alt=""
          />
        </div>
        <h1>{user.username}</h1>
      </div>
    </header>
  );
};

export default Header;
