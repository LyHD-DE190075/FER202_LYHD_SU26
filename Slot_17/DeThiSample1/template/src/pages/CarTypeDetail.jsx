import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Card, Button, Spinner, Alert, Table, Badge } from 'react-bootstrap'
import { fetchCarTypes, fetchCars } from '../api/carApi'
import { formatPriceRange } from '../utils/format'

export default function CarTypeDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [carType, setCarType] = useState(null)
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const load = async () => {
      // TODO-10A: Dùng Promise.all fetch carTypes + cars
      // Tìm carType theo id; nếu không tìm thấy → navigate('/not-found', { replace: true })
      // Lọc cars theo carTypeId, cập nhật state
      try {
        const [carTypes, allCars] = await Promise.all([fetchCarTypes(), fetchCars()])
        const found = carTypes.find((ct) => String(ct.id) === String(id))
        if (!found) {
          navigate('/not-found', { replace: true })
          return
        }
        setCarType(found)
        setCars(allCars.filter((c) => String(c.carTypeId) === String(id)))
        setLoading(false)
      } catch (err) {
        setError(err.message || 'Failed to load car type.')
        setLoading(false)
      }
    }
    load()
  }, [id])

  // TODO-10A: Nếu loading → Spinner; nếu error → Alert danger
  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />
  if (error) return <Alert variant="danger" role="alert">{error}</Alert>

  return (
    <div>
      {/* TODO-10A: Nút Back navigate('/car-types') */}
      <Button onClick={() => navigate('/car-types')}>← Back to Car Types</Button>
      {/* TODO-10A: Card với carType name, Badge id */}
      <Card className="my-3 shadow-sm">
        <Card.Body>
          <Card.Title>
            {carType.name} <Badge bg="secondary">{cars.length} cars</Badge>
          </Card.Title>
        </Card.Body>
      </Card>
      {/* TODO-10A: Table cars (name, brand, transmission, formatPriceRange, lastServiced) */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Brand</th>
            <th>Transmission</th>
            <th>Price Range</th>
            <th>Last Serviced</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr key={car.id}>
              <td>{car.name}</td>
              <td>{car.brand}</td>
              <td>{car.transmission}</td>
              <td>{formatPriceRange(car.priceWeekday, car.priceWeekend)}</td>
              <td>{car.lastServiced}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
