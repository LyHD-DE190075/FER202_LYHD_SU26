// src/pages/RegistrationForm.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const INITIAL_FORM = { username: '', email: '', password: '', confirmPassword: '' };
const INITIAL_ERRORS = { username: '', email: '', password: '', confirmPassword: '' };

// password: min 6 chars, at least 1 uppercase, 1 lowercase, 1 digit, 1 special char
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{6,}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(form) {
  const errors = { ...INITIAL_ERRORS };

  if (!form.username.trim())
    errors.username = 'Username không được để trống.';

  if (!form.email.trim())
    errors.email = 'Email không được để trống.';
  else if (!EMAIL_REGEX.test(form.email))
    errors.email = 'Email không đúng định dạng.';

  if (!form.password)
    errors.password = 'Password không được để trống.';
  else if (!PASSWORD_REGEX.test(form.password))
    errors.password = 'Tối thiểu 6 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt.';

  if (!form.confirmPassword)
    errors.confirmPassword = 'Vui lòng xác nhận password.';
  else if (form.password !== form.confirmPassword)
    errors.confirmPassword = 'Confirm password không khớp.';

  return errors;
}

function hasErrors(errors) {
  return Object.values(errors).some(e => e !== '');
}

function RegistrationForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [touched, setTouched] = useState({});
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };
    setForm(updated);
    if (touched[name]) {
      setErrors(validate(updated));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(validate(form));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ username: true, email: true, password: true, confirmPassword: true });
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (!hasErrors(validationErrors)) {
      setShowModal(true);
    }
  };

  const handleCancel = () => {
    setForm(INITIAL_FORM);
    setErrors(INITIAL_ERRORS);
    setTouched({});
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate('/posts');
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow">
            <Card.Header className="bg-primary text-white text-center py-3">
              <h4 className="mb-0">Tạo tài khoản</h4>
            </Card.Header>
            <Card.Body className="p-4">
              <Form noValidate onSubmit={handleSubmit}>

                {/* Username */}
                <Form.Group className="mb-3">
                  <Form.Label>Username <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.username && !!errors.username}
                    isValid={touched.username && !errors.username && form.username !== ''}
                    placeholder="Nhập username"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Email */}
                <Form.Group className="mb-3">
                  <Form.Label>Email <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.email && !!errors.email}
                    isValid={touched.email && !errors.email && form.email !== ''}
                    placeholder="Nhập email"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Password */}
                <Form.Group className="mb-3">
                  <Form.Label>Password <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.password && !!errors.password}
                    isValid={touched.password && !errors.password && form.password !== ''}
                    placeholder="Nhập password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                  <Form.Text className="text-muted">
                    Tối thiểu 6 ký tự, gồm chữ hoa, chữ thường, số và ký tự đặc biệt.
                  </Form.Text>
                </Form.Group>

                {/* Confirm Password */}
                <Form.Group className="mb-4">
                  <Form.Label>Confirm Password <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.confirmPassword && !!errors.confirmPassword}
                    isValid={touched.confirmPassword && !errors.confirmPassword && form.confirmPassword !== ''}
                    placeholder="Nhập lại password"
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Buttons */}
                <div className="d-flex gap-2">
                  <Button variant="primary" type="submit" className="flex-grow-1">
                    Register
                  </Button>
                  <Button variant="outline-secondary" type="button" onClick={handleCancel} className="flex-grow-1">
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Success Modal - tương tự MyModal */}
      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton className="bg-success text-white">
          <Modal.Title>Đăng ký thành công!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center py-4">
          <div style={{ fontSize: '3.5rem' }}>✅</div>
          <h5 className="mt-3">Chào mừng, <strong>{form.username}</strong>!</h5>
          <p className="text-muted mb-2">Tài khoản của bạn đã được tạo thành công.</p>
          <p className="mb-0"><strong>Email:</strong> {form.email}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleModalClose}>
            Đến trang Blog Posts →
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default RegistrationForm;
