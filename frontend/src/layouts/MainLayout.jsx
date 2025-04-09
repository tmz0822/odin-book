import { Outlet } from 'react-router';
import Header from '../components/common/Header';

const MainLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-200">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;

