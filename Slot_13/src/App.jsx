import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AppNavbar from './components/AppNavbar'
import LoadingSpinner from './components/LoadingSpinner'
import HomePage from './pages/HomePage'

/**
 * TODO-09 (10đ): Lazy load MenuPage và TablePage bằng React.lazy()
 *
 * Bước 1 – Import lazy từ react (đã có Suspense):
 *   import { lazy, Suspense } from 'react'
 *
 * Bước 2 – Khai báo lazy component (thay 2 dòng comment bên dưới):
 *   const MenuPage  = lazy(() => import('./pages/MenuPage'))
 *   const TablePage = lazy(() => import('./pages/TablePage'))
 *
 * Bước 3 – Bọc <Routes> trong <Suspense>:
 *   <Suspense fallback={<LoadingSpinner message="Đang tải trang..." />}>
 *     <Routes> ... </Routes>
 *   </Suspense>
 *
 * Bước 4 – Thêm 2 Route còn thiếu:
 *   <Route path="/menu"   element={<MenuPage />} />
 *   <Route path="/tables" element={<TablePage />} />
 *
 * Cách kiểm tra kết quả:
 *   Mở DevTools → tab Network → filter "JS"
 *   Lần đầu vào /menu  → thấy file chunk mới được tải
 *   Lần đầu vào /tables → thấy thêm 1 chunk nữa
 */

const MenuPage  = lazy(() => import('./pages/MenuPage'))
const TablePage = lazy(() => import('./pages/TablePage'))

function App() {
  return (
    <Router>
      <AppNavbar />
      <Suspense fallback={<LoadingSpinner message="Đang tải trang..." />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/tables" element={<TablePage />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
