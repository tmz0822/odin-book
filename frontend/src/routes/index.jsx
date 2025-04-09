import { createBrowserRouter } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import Home from '../pages/Home';
import ProtectedRoute from './ProtectedRoute';
import MainLayout from '../layouts/MainLayout';
import Playground from '../components/Playground';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/playground',
    element: <Playground />,
  },
]);

export default router;

