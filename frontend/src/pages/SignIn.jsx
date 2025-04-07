import { useContext } from 'react';
import { useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      setError('');
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="bg-amber-50 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold my-5">Sign in</h1>

      <form
        className="border-1 w-full max-w-[400px] p-8 "
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="username">Username</label>
          <input
            className="border-1"
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            className="border-1"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn-primary" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default SignIn;
