import { Suspense, lazy } from 'react';
import PageHeader from '../components/PageHeader';
import { UsersIcon } from '../components/icons';

const UserList = lazy(() => import('../UserList'));

const Home = () => {
  return (
    <div>
      <PageHeader icon={<UsersIcon />} title="Users" />
      <Suspense fallback={<div className="list-loading">Loading users...</div>}>
        <UserList />
      </Suspense>
    </div>
  );
};

export default Home;
