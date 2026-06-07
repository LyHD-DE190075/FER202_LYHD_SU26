import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';

export default function UserDashboard() {
  const { state, dispatch } = useAuth();
  const { user } = state;

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  if (!user) return null

  return (
    <Card className="mt-4">
      <Card.Body>
        <h4>Xin chào, {user.name}</h4>
        
        <p>
          Role: 
          <Badge 
            bg={user.role === 'admin' ? 'danger' : 'success'} 
            className="ms-2"
          >
            {user.role}
          </Badge>
        </p>

        <Button variant="outline-primary" onClick={handleLogout}>
          Đăng xuất
        </Button>
      </Card.Body>
    </Card>
  );
}