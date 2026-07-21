import { useEffect, useState } from 'react';
import { fetchUsers } from './api';

const UserList = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    fetchUsers().then(setUsers);
  }, []);

  if (!users) return <div className="list-loading">Loading users...</div>;

  return (
    <ul className="card-list">
      {users.map((user) => (
        <li key={user.id} className="card-list-item">
          <strong>{user.name}</strong>
          <span>{user.email}</span>
        </li>
      ))}
    </ul>
  );
};

export default UserList;
