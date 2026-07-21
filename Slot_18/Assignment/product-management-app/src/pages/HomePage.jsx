import { useState, useEffect } from 'react'
import { Container, Alert, Spinner } from 'react-bootstrap'
import { getProducts, addProduct, deleteProduct } from '../services/productService'
import ProductList from '../components/ProductList'
import AddProductForm from '../components/AddProductForm'

// TODO-04: Fetch data từ API, xử lý loading + error
function HomePage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true)
        const data = await getProducts()
        setProducts(data)
        setError(null)
      } catch (err) {
        setError('Không thể tải danh sách sản phẩm. Vui lòng kiểm tra API server!')
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Bạn có chắc muốn xóa sản phẩm này?')) return
    try {
      await deleteProduct(id)
      // Lọc bỏ sản phẩm vừa xóa khỏi state
      setProducts((prev) => prev.filter((p) => p.id !== id))
    } catch (err) {
      alert('Xóa sản phẩm thất bại!')
    }
  }

  const handleAdd = async (newProduct) => {
    try {
      const created = await addProduct(newProduct)
      // Cập nhật state — KHÔNG mutate mảng cũ, tạo mảng mới
      setProducts((prev) => [...prev, created])
    } catch (err) {
      alert('Thêm sản phẩm thất bại!')
    }
  }

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Loading products...</p>
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    )
  }

  return (
    <Container className="py-4">
      <h2 className="mb-4">🛒 Product List</h2>
      <AddProductForm onAdd={handleAdd} />
      <ProductList products={products} onDelete={handleDelete} />
    </Container>
  )
}

export default HomePage
