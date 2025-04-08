import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading user...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="signin" replace />;
  }

  return children;
};

export default ProtectedRoute;
