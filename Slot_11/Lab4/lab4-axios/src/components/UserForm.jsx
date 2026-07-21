import { useState, useEffect } from 'react';

const emptyForm = {
  fullName: '',
  email: '',
  phone: '',
  role: 'User',
  status: 'active',
};

function validate(form, isProfile = false) {
  const errors = {};

  if (!form.fullName.trim())
    errors.fullName = 'Họ tên không được để trống.';
  else if (form.fullName.trim().length < 3)
    errors.fullName = 'Họ tên phải có ít nhất 3 ký tự.';

  if (!form.email.trim())
    errors.email = 'Email không được để trống.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = 'Email không hợp lệ.';

  if (!form.phone.trim())
    errors.phone = 'Số điện thoại không được để trống.';
  else if (!/^0\d{9}$/.test(form.phone))
    errors.phone = 'Số điện thoại phải 10 chữ số, bắt đầu bằng 0.';

  return errors;
}

export default function UserForm({ show, editUser, onSubmit, onClose, isProfile = false }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!show) return;
    if (editUser) {
      setForm({
        fullName: editUser.fullName,
        email:    editUser.email,
        phone:    editUser.phone,
        role:     editUser.role,
        status:   editUser.status,
      });
    } else {
      setForm(emptyForm);
    }
    setErrors({});
  }, [show, editUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form, isProfile);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    try {
      await onSubmit(form);
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  if (!show) return null;

  return (
    <div
      className="modal d-block"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {isProfile ? 'Cập nhật thông tin' : editUser ? 'Sửa người dùng' : 'Thêm người dùng'}
            </h5>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              {/* Họ tên */}
              <div className="mb-3">
                <label className="form-label">Họ tên</label>
                <input
                  name="fullName"
                  className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                  value={form.fullName}
                  onChange={handleChange}
                />
                {errors.fullName && (
                  <div className="invalid-feedback">{errors.fullName}</div>
                )}
              </div>

              {/* Email */}
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  name="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  value={form.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              {/* Số điện thoại */}
              <div className="mb-3">
                <label className="form-label">Số điện thoại</label>
                <input
                  name="phone"
                  className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                  value={form.phone}
                  onChange={handleChange}
                />
                {errors.phone && (
                  <div className="invalid-feedback">{errors.phone}</div>
                )}
              </div>

              {/* Role & Status — chỉ Admin mới thấy */}
              {!isProfile && (
                <>
                  <div className="mb-3">
                    <label className="form-label">Vai trò</label>
                    <select
                      name="role"
                      className="form-select"
                      value={form.role}
                      onChange={handleChange}
                    >
                      <option value="Admin">Admin</option>
                      <option value="Manager">Manager</option>
                      <option value="User">User</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Trạng thái</label>
                    <select
                      name="status"
                      className="form-select"
                      value={form.status}
                      onChange={handleChange}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </>
              )}
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                Hủy
              </button>
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting ? 'Đang lưu...' : 'Lưu'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
