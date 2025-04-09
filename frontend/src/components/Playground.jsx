import { useContext } from 'react';
import CommentForm from './comment/CommentForm';
import Dialog from './common/Dialog';
import { AuthContext } from '../contexts/AuthContext';

const Playground = () => {
  const { loading } = useContext(AuthContext);

  if (loading) return;

  return (
    <div className="flex items-center justify-center h-lvh border-1">
      <CommentForm />
    </div>
  );
};

export default Playground;
