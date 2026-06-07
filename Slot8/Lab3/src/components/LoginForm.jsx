import React, { useState } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';
import { findUser } from '../utils/authHelpers';

export default function LoginForm() {
  const { state, dispatch } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Gọi hàm helper để kiểm tra user
    const user = await findUser(username, password);

    if (user) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } else {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Sai username hoặc password!' });
    }
  };

  return (
    <Card>
      <Card.Header className="bg-primary text-white">Đăng nhập</Card.Header>
      <Card.Body>
        {state.error && <Alert variant="danger">{state.error}</Alert>}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Đăng nhập
          </Button>
        </Form>
      </Card.Body>
      <Card.Footer>Vui lòng nhập thông tin tài khoản</Card.Footer>
    </Card>
  );
}