import { Outlet } from 'react-router';
import Header from '../components/Header';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-200">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
