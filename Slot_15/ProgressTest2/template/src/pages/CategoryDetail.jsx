import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Button, Table, Spinner, Alert, Badge } from 'react-bootstrap'
import axios from 'axios'

const BASE_URL = 'http://localhost:3001'

export default function CategoryDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  // TODO-09: Khai báo state: category (null), restaurants ([]), loading (true), error (null)
  const [category, setCategory] = useState(null)
  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const load = async () => {
      // TODO-09: Gọi song song Promise.all:
      //   - GET /categories → tìm category theo id
      //   - GET /restaurants → lọc theo categoryId === id
      // Nếu category không tồn tại: setError('Category not found.')
      // Dùng try/catch + finally để setLoading(false)
    }
    load()
  }, [id])

  // TODO-09: Hiển thị <Spinner> khi loading, <Alert variant="danger"> khi có lỗi
  if (loading) return null
  if (error) return null

  return (
    <div>
      {/* TODO-09: Nút Back về '/categories' */}

      {/* TODO-09: Card hiển thị tên category trong <Badge> và số lượng nhà hàng */}

      {/* TODO-09: Table danh sách nhà hàng với cột: #, Name, Owner, Address, Price Range */}
    </div>
  )
}
