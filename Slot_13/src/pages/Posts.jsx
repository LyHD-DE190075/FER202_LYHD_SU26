import { Suspense, lazy } from 'react';
import PageHeader from '../components/PageHeader';
import { PostsIcon } from '../components/icons';

const PostList = lazy(() => import('../PostList'));

const Posts = () => {
  return (
    <div>
      <PageHeader icon={<PostsIcon />} title="Posts" />
      <Suspense fallback={<div className="list-loading">Loading posts...</div>}>
        <PostList />
      </Suspense>
    </div>
  );
};

export default Posts;
