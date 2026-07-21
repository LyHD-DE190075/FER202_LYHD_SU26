import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Button, Spinner, Alert, Badge } from 'react-bootstrap'
import { fetchRestaurantById } from '../api/restaurantApi'
import { useRestaurant } from '../context/RestaurantContext'
import { formatVND, formatDateDisplay } from '../utils/format'

export default function RestaurantDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { state } = useRestaurant()

  // TODO-05: Khai báo state: restaurant, loading (true), error (null)
  const [restaurant, setRestaurant] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // TODO-05: Gọi fetchRestaurantById(id) để lấy dữ liệu.
    // - Nếu thành công: setRestaurant(data)
    // - Nếu lỗi: setError(e.message)
    // - Luôn: setLoading(false)
  }, [id])

  // TODO-05: Hiển thị <Spinner> khi loading, <Alert variant="danger"> khi có lỗi
  if (loading) return null
  if (error) return null
  if (!restaurant) return null

  // Tìm tên category từ context
  const categoryName =
    state.categories.find((c) => c.id === restaurant.categoryId)?.name || 'Unknown'

  return (
    <div>
      {/* TODO-05: Nút Back — khi nhấn navigate(-1) */}

      <Card>
        <Card.Header as="h5">{restaurant.name}</Card.Header>
        <Card.Body>
          {/* TODO-05: Hiển thị Category (Badge), Owner, Address,
              Price Min (formatVND), Price Max (formatVND),
              Open Date (formatDateDisplay, chỉ hiện nếu có) */}
        </Card.Body>
      </Card>
    </div>
  )
}
