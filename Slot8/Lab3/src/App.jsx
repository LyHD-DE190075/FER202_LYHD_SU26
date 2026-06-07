import { useAuth } from './hooks/useAuth'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import AppNavbar from './components/AppNavbar'

function App() {
  // Lấy state từ useAuth()
  const { state } = useAuth()

  return (
    <div>
      {/* Hiển thị AppNavbar chỉ khi đã đăng nhập */}
      {state.isAuthenticated && <AppNavbar />}

      {/* Điều kiện hiển thị trang */}
      {state.isAuthenticated ? (
        <DashboardPage />
      ) : (
        <LoginPage />
      )}

      {/* Phần footer skeleton có thể giữ lại hoặc bỏ đi khi app hoàn thiện */}
      <p style={{ textAlign: 'center', marginTop: '2rem', color: '#999' }}>
        App đã được hoàn thiện logic phân quyền.
      </p>
    </div>
  )
}

export default App