import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { userApi } from '../api/userApi';
import UserForm from '../components/UserForm';
import ConfirmDialog from '../components/ConfirmDialog';

// ─── Toast helper ────────────────────────────────────────────────────────────
function useToast() {
  const [toast, setToast] = useState(null);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);
  const show = (message, type = 'success') => setToast({ message, type });
  return { toast, show };
}

// ─── Admin view ───────────────────────────────────────────────────────────────
function AdminUsersView() {
  const [users, setUsers]             = useState([]);
  const [loading, setLoading]         = useState(true);
  const [search, setSearch]           = useState('');
  const [filterRole, setFilterRole]   = useState('');
  const [showForm, setShowForm]       = useState(false);
  const [editUser, setEditUser]       = useState(null);
  const [confirmTarget, setConfirmTarget] = useState(null);
  const { toast, show: showToast }    = useToast();

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const params = filterRole ? { role: filterRole } : {};
      const { data } = await userApi.getAll(params);
      setUsers(data);
    } finally {
      setLoading(false);
    }
  }, [filterRole]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const filtered = users.filter(u =>
    u.fullName.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.phone.includes(search)
  );

  const handleAdd = async (formData) => {
    await userApi.create(formData);
    showToast('Thêm người dùng thành công!');
    fetchUsers();
  };

  const handleEdit = async (formData) => {
    await userApi.update(editUser.id, { ...editUser, ...formData });
    showToast('Cập nhật thành công!');
    fetchUsers();
  };

  const handleToggleStatus = async (user) => {
    const newStatus = user.status === 'active' ? 'inactive' : 'active';
    setUsers(prev => prev.map(u => u.id === user.id ? { ...u, status: newStatus } : u));
    try {
      await userApi.patch(user.id, { status: newStatus });
      showToast(`Đã ${newStatus === 'inactive' ? 'vô hiệu hóa' : 'kích hoạt'} tài khoản.`);
    } catch {
      setUsers(prev => prev.map(u => u.id === user.id ? { ...u, status: user.status } : u));
      showToast('Cập nhật trạng thái thất bại.', 'danger');
    }
  };

  const openAdd = () => { setEditUser(null); setShowForm(true); };
  const openEdit = (user) => { setEditUser(user); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditUser(null); };

  return (
    <div className="container-fluid py-4">
      {toast && (
        <div className={`alert alert-${toast.type} position-fixed top-0 end-0 m-3`}
          style={{ zIndex: 9999 }}>
          {toast.message}
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Quản lý người dùng</h4>
        <Logout />
      </div>

      {/* Toolbar */}
      <div className="row g-2 mb-3">
        <div className="col-md-5">
          <input
            className="form-control"
            placeholder="Tìm kiếm theo tên, email, SĐT..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-select"
            value={filterRole}
            onChange={e => setFilterRole(e.target.value)}
          >
            <option value="">-- Tất cả vai trò --</option>
            <option value="Admin">Admin</option>
            <option value="Manager">Manager</option>
            <option value="User">User</option>
          </select>
        </div>
        <div className="col-auto">
          <button className="btn btn-primary" onClick={openAdd}>
            + Thêm người dùng
          </button>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" />
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Họ tên</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Vai trò</th>
                <th>Trạng thái</th>
                <th>Ngày tạo</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={8} className="text-center text-muted">Không có dữ liệu</td></tr>
              ) : filtered.map(u => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.fullName}</td>
                  <td>{u.email}</td>
                  <td>{u.phone}</td>
                  <td>{u.role}</td>
                  <td>
                    <span className={`badge ${u.status === 'active' ? 'bg-success' : 'bg-secondary'}`}>
                      {u.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>{u.createdAt}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary me-1"
                      onClick={() => openEdit(u)}
                    >
                      Sửa
                    </button>
                    <button
                      className={`btn btn-sm ${u.status === 'active' ? 'btn-warning' : 'btn-success'}`}
                      onClick={() => setConfirmTarget(u)}
                    >
                      {u.status === 'active' ? 'Disable' : 'Enable'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <UserForm
        show={showForm}
        editUser={editUser}
        onSubmit={editUser ? handleEdit : handleAdd}
        onClose={closeForm}
      />

      <ConfirmDialog
        show={!!confirmTarget}
        message={
          confirmTarget
            ? `${confirmTarget.status === 'active' ? 'Vô hiệu hóa' : 'Kích hoạt'} tài khoản "${confirmTarget.fullName}"?`
            : ''
        }
        onConfirm={() => { handleToggleStatus(confirmTarget); setConfirmTarget(null); }}
        onCancel={() => setConfirmTarget(null)}
      />
    </div>
  );
}

// ─── Non-admin profile view ───────────────────────────────────────────────────
function ProfileView() {
  const { currentUser } = useAuth();
  const [user, setUser]       = useState(null);
  const [showForm, setShowForm] = useState(false);
  const { toast, show: showToast } = useToast();

  useEffect(() => {
    userApi.getById(currentUser.id).then(({ data }) => setUser(data));
  }, [currentUser.id]);

  const handleEdit = async (formData) => {
    const updated = { ...user, ...formData };
    await userApi.update(user.id, updated);
    setUser(updated);
    showToast('Cập nhật thông tin thành công!');
  };

  if (!user) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" />
      </div>
    );
  }

  return (
    <div className="container py-5" style={{ maxWidth: 520 }}>
      {toast && (
        <div className={`alert alert-${toast.type}`}>{toast.message}</div>
      )}

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">Thông tin tài khoản</h4>
        <Logout />
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <dl className="row mb-0">
            <dt className="col-sm-4">Họ tên</dt>
            <dd className="col-sm-8">{user.fullName}</dd>

            <dt className="col-sm-4">Email</dt>
            <dd className="col-sm-8">{user.email}</dd>

            <dt className="col-sm-4">Số điện thoại</dt>
            <dd className="col-sm-8">{user.phone}</dd>

            <dt className="col-sm-4">Vai trò</dt>
            <dd className="col-sm-8">{user.role}</dd>

            <dt className="col-sm-4">Trạng thái</dt>
            <dd className="col-sm-8">
              <span className={`badge ${user.status === 'active' ? 'bg-success' : 'bg-secondary'}`}>
                {user.status === 'active' ? 'Active' : 'Inactive'}
              </span>
            </dd>
          </dl>
        </div>
        <div className="card-footer">
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            Cập nhật thông tin
          </button>
        </div>
      </div>

      <UserForm
        show={showForm}
        editUser={user}
        onSubmit={handleEdit}
        onClose={() => setShowForm(false)}
        isProfile
      />
    </div>
  );
}

// ─── Logout button (dùng chung) ───────────────────────────────────────────────
function Logout() {
  const { currentUser, logout } = useAuth();
  return (
    <div className="d-flex align-items-center gap-2">
      <span className="text-muted small">
        {currentUser.fullName} ({currentUser.role})
      </span>
      <button className="btn btn-sm btn-outline-danger" onClick={logout}>
        Đăng xuất
      </button>
    </div>
  );
}

// ─── Entry point ──────────────────────────────────────────────────────────────
export default function UsersPage() {
  const { currentUser } = useAuth();
  return currentUser.role === 'Admin' ? <AdminUsersView /> : <ProfileView />;
}
