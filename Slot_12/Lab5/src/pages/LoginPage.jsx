import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap'
import { useAuth } from '../context/AuthContext'
import { validateLogin } from '../utils/validate'

function LoginPage() {
  const { login, loading, error, clearError } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [localError, setLocalError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    // 1. Validate client-side trước
    const err = validateLogin(email, password)
    if (err) { setLocalError(err); return }

    setLocalError(null)
    clearError()

    // 2. Gọi login từ context (trả về true/false)
    const success = await login({ email, password })
    if (success) navigate('/home')
  }

  return (
    <Container className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh' }}>
      <Card style={{ width: '420px' }}>
        <Card.Body className="p-4">
          <h4 className="text-center mb-1">🎓 Course Management System</h4>
          <p className="text-center text-muted mb-4">Please sign in to continue</p>

          {(localError || error) && (
            <Alert variant="danger">{localError || error}</Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" placeholder="student01@fpt.edu.vn"
                value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password"
                value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100" disabled={loading}>
              {loading ? <Spinner size="sm" animation="border" /> : 'Login'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default LoginPage
