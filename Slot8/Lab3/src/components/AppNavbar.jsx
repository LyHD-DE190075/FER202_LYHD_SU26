import { Navbar, Container, Button } from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';

export default function AppNavbar() {
  const { state, dispatch } = useAuth();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <Navbar bg="light" expand="lg" role="navigation">
      <Container>
        <Navbar.Brand>My Application</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          {state.isAuthenticated && state.user ? (
            <>
              <Navbar.Text className="me-3">
                Xin chào, <strong>{state.user.name}</strong>
              </Navbar.Text>
              <Button variant="outline-danger" onClick={handleLogout}>
                Đăng xuất
              </Button>
            </>
          ) : (
            <Navbar.Text>Chưa đăng nhập</Navbar.Text>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}