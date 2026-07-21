import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Header() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <Navbar bg="primary" variant="dark" className="mb-4">
      <Container>
        <Navbar.Brand>🎓 Course Management System</Navbar.Brand>
        <Nav className="ms-auto align-items-center">
          {user && (
            <>
              <Navbar.Text className="me-3 text-white">
                Signed in as <strong>{user.fullName}</strong>
              </Navbar.Text>
              <Button variant="outline-light" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  )
}

export default Header
