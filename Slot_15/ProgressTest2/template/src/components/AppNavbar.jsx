import { Navbar, Nav, Container, Button, Badge } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import about from '../data/about'

export default function AppNavbar() {
  const { user, logoutUser } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    // TODO-03: Gọi logoutUser() và navigate về '/login'
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        {/* TODO-04: Thêm logo (about.logo) và tên app (about.appName).
            Khi nhấn vào brand, navigate về '/'.
            Gợi ý: dùng <Navbar.Brand as={Link} to="/"> */}
        <Navbar.Brand>
          {about.appName}
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          {user && (
            <>
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/add">Add Restaurant</Nav.Link>
                <Nav.Link as={Link} to="/categories">Manage Categories</Nav.Link>
              </Nav>
              <Nav className="align-items-center">
                {/* TODO-02: Hiển thị thông tin user khi đã đăng nhập.
                    - user.fullName dạng chữ đậm, màu trắng
                    - user.role dùng <Badge>
                    Gợi ý: dùng <Navbar.Text> */}

                {/* TODO-03: Nút Logout — khi nhấn gọi handleLogout() */}
              </Nav>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
