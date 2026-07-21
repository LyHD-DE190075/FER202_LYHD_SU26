import { useEffect, useState } from 'react';
import { fetchPosts } from './api';

const PostList = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    fetchPosts().then(setPosts);
  }, []);

  if (!posts) return <div className="list-loading">Loading posts...</div>;

  return (
    <ul className="card-list">
      {posts.map((post) => (
        <li key={post.id} className="card-list-item">
          <strong>{post.title}</strong>
          <span>{post.body}</span>
        </li>
      ))}
    </ul>
  );
};

export default PostList;
