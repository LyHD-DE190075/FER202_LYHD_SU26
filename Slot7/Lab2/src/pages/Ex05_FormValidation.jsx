/**
 * Bài 5 – Form Validation (useReducer)
 * ======================================
 */
import { useReducer } from 'react'
import { Card, Form, Button, Alert } from 'react-bootstrap'

const initialState = {
  values: { name: '', email: '', password: '', confirm: '' },
  errors: {},
  touched: {},
  submitted: false,
}

// TODO 2: Hàm validate
function validate(values) {
  const errors = {}
  if (!values.name) errors.name = 'Họ tên không được rỗng'
  if (!values.email.includes('@')) errors.email = 'Email phải chứa @'
  if (values.password.length < 6) errors.password = 'Mật khẩu tối thiểu 6 ký tự'
  if (values.confirm !== values.password) errors.confirm = 'Mật khẩu xác nhận không khớp'
  return errors
}

// TODO 3: Reducer
function reducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD': {
      const { field, value } = action.payload
      const newValues = { ...state.values, [field]: value }
      return {
        ...state,
        values: newValues,
        touched: { ...state.touched, [field]: true },
        errors: validate(newValues),
      }
    }
    case 'SUBMIT': {
      const errors = validate(state.values)
      return {
        ...state,
        errors,
        touched: { name: true, email: true, password: true, confirm: true },
        submitted: Object.keys(errors).length === 0,
      }
    }
    case 'RESET':
      return initialState
    default:
      return state
  }
}

export default function Ex05_FormValidation() {
  const [state, dispatch] = useReducer(reducer, initialState)

  function getError(field) {
    return state.touched[field] ? state.errors[field] : undefined
  }

  function handleChange(e) {
    const { name, value } = e.target
    dispatch({ type: 'SET_FIELD', payload: { field: name, value } })
  }

  function handleSubmit(e) {
    e.preventDefault()
    dispatch({ type: 'SUBMIT' })
  }

  return (
    <Card className="mx-auto" style={{ maxWidth: 480 }}>
      <Card.Header><strong>Bài 5 – Form Validation</strong></Card.Header>
      <Card.Body>
        {state.submitted && (
          <Alert variant="success" data-testid="form-success">
            Đăng ký thành công!
          </Alert>
        )}

        <Form onSubmit={handleSubmit} data-testid="register-form" noValidate>
          <Form.Group className="mb-3">
            <Form.Label>Họ tên</Form.Label>
            <Form.Control
              data-testid="input-name"
              name="name"
              value={state.values.name}
              onChange={handleChange}
              placeholder="Họ và tên"
              isInvalid={!!getError('name')}
            />
            <Form.Control.Feedback type="invalid" data-testid="error-name">
              {getError('name')}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
data-testid="input-email"
              name="email"
              value={state.values.email}
              onChange={handleChange}
              placeholder="email@example.com"
              isInvalid={!!getError('email')}
            />
            <Form.Control.Feedback type="invalid" data-testid="error-email">
              {getError('email')}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              data-testid="input-password"
              name="password"
              value={state.values.password}
              onChange={handleChange}
              placeholder="Tối thiểu 6 ký tự"
              isInvalid={!!getError('password')}
            />
            <Form.Control.Feedback type="invalid" data-testid="error-password">
              {getError('password')}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Xác nhận mật khẩu</Form.Label>
            <Form.Control
              type="password"
              data-testid="input-confirm"
              name="confirm"
              value={state.values.confirm}
              onChange={handleChange}
              placeholder="Nhập lại mật khẩu"
              isInvalid={!!getError('confirm')}
            />
            <Form.Control.Feedback type="invalid" data-testid="error-confirm">
              {getError('confirm')}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex gap-2">
            <Button type="submit" data-testid="btn-submit">Đăng ký</Button>
            <Button 
                type="button" 
                variant="secondary" 
                data-testid="btn-reset" 
                onClick={() => dispatch({ type: 'RESET' })}
            >
              Reset
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}
