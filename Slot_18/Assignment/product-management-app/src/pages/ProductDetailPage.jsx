import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Container, Row, Col, Button, Alert, Spinner, Badge } from 'react-bootstrap'
import { getProductById } from '../services/productService'

// TODO-08: Trang chi tiết sản phẩm
function ProductDetailPage() {
  const { id } = useParams() // Lấy id từ URL /products/:id
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const data = await getProductById(id)
        setProduct(data)
        setError(null)
      } catch (err) {
        setError('Không tìm thấy sản phẩm!')
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  if (loading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    )
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
        <Button as={Link} to="/" variant="secondary">← Back to List</Button>
      </Container>
    )
  }

  return (
    <Container className="py-4">
      <Button as={Link} to="/" variant="outline-secondary" className="mb-4">
        ← Back to List
      </Button>
      <Row>
        <Col md={5}>
          <img
            src={`/images/${product.image}`}
            alt={product.name}
            className="img-fluid border rounded p-3"
          />
        </Col>
        <Col md={7}>
          <h3>{product.name}</h3>
          <Badge bg="secondary" className="mb-3">ID: {product.id}</Badge>
          <p className="text-muted">{product.description}</p>
          <p>
            <span className="text-decoration-line-through text-muted me-3">
              {product.price} đ
            </span>
            <span className="text-danger fs-4 fw-bold">
              {product.currentPrice} đ
            </span>
          </p>
          <Button as={Link} to={`/products/${product.id}/edit`} variant="warning">
            ✏️ Edit
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default ProductDetailPage
