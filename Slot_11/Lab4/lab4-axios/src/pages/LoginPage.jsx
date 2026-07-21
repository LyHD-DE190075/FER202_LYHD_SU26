import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login, error } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!username.trim()) errs.username = 'Tên đăng nhập không được để trống.';
    if (!password.trim()) errs.password = 'Mật khẩu không được để trống.';
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    await login(username, password);
    setSubmitting(false);
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow" style={{ width: '380px' }}>
        <div className="card-body p-4">
          <h4 className="card-title text-center mb-4">Đăng nhập</h4>

          {error && (
            <div className="alert alert-danger py-2">{error}</div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label className="form-label">Tên đăng nhập</label>
              <input
                className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                value={username}
                onChange={e => { setUsername(e.target.value); setErrors(prev => ({ ...prev, username: '' })); }}
                autoFocus
              />
              {errors.username && (
                <div className="invalid-feedback">{errors.username}</div>
              )}
            </div>

            <div className="mb-3">
              <label className="form-label">Mật khẩu</label>
              <input
                type="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                value={password}
                onChange={e => { setPassword(e.target.value); setErrors(prev => ({ ...prev, password: '' })); }}
              />
              {errors.password && (
                <div className="invalid-feedback">{errors.password}</div>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={submitting}
            >
              {submitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
