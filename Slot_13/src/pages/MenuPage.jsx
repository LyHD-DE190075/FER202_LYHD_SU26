import { useState, useEffect } from 'react'
import { Container, Spinner, Alert } from 'react-bootstrap'
import MenuList from '../components/MenuList'
import AddMenuForm from '../components/AddMenuForm'
import SearchBar from '../components/SearchBar'
import { fetchMenus, addMenu, deleteMenu } from '../services/restaurantService'

/**
 * TODO-07 (15đ): Trang Thực Đơn – quản lý state và kết nối API
 *
 * State cần khai báo:
 *  - menus      : [] (danh sách món ăn)
 *  - loading    : true
 *  - error      : null
 *  - searchTerm : '' (chuỗi tìm kiếm – dùng cho TODO-08)
 *
 * useEffect (chạy 1 lần khi mount):
 *  - Gọi fetchMenus()
 *  - .then  → setMenus(data)
 *  - .catch → setError(err.message)
 *  - .finally → setLoading(false)
 *
 * handleAdd(menuData):
 *  - Gọi addMenu(menuData) → nhận về newMenu (có id từ server)
 *  - Thêm newMenu vào cuối mảng menus
 *
 * handleDelete(id):
 *  - Gọi deleteMenu(id)
 *  - Xóa item có id khỏi mảng menus (filter)
 *
 * TODO-08 (tích hợp SearchBar):
 *  - Tạo mảng filtered = menus.filter theo searchTerm (không phân biệt hoa thường)
 *  - Truyền filtered (không phải menus) xuống MenuList
 *  - Truyền setSearchTerm xuống SearchBar qua prop onSearch
 *
 * Render:
 *  - Đang load  → <Spinner animation="border" className="d-block mx-auto mt-5" />
 *  - Có lỗi     → <Alert variant="danger">{error}</Alert>
 *  - Bình thường:
 *      <h2>🍽️ Thực Đơn</h2>
 *      <SearchBar onSearch={setSearchTerm} />
 *      <AddMenuForm onAdd={handleAdd} />
 *      <MenuList menus={filtered} onDelete={handleDelete} />
 */
function MenuPage() {
  const [menus, setMenus] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchMenus()
      .then(data => setMenus(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const handleAdd = async (menuData) => {
    const newMenu = await addMenu(menuData)
    setMenus(prev => [...prev, newMenu])
  }

  const handleDelete = async (id) => {
    await deleteMenu(id)
    setMenus(prev => prev.filter(m => m.id !== id))
  }

  const filtered = menus.filter(m =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />
  if (error) return <Alert variant="danger">{error}</Alert>

  return (
    <Container>
      <h2>🍽️ Thực Đơn</h2>
      <SearchBar onSearch={setSearchTerm} />
      <AddMenuForm onAdd={handleAdd} />
      <MenuList menus={filtered} onDelete={handleDelete} />
    </Container>
  )
}

export default MenuPage
