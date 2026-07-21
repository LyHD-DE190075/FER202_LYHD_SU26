import { useState } from 'react'
import { Form, Button, Card } from 'react-bootstrap'

// TODO-05: Form controlled inputs + validate
function AddProductForm({ onAdd }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    currentPrice: '',
  })
  const [validated, setValidated] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget

    if (!form.checkValidity()) {
      setValidated(true)
      return
    }

    onAdd({ ...formData, image: 'laptop1.png' })

    // Reset form sau khi submit
    setFormData({ name: '', description: '', price: '', currentPrice: '' })
    setValidated(false)
  }

  return (
    <Card className="mb-4">
      <Card.Header>➕ Add New Product</Card.Header>
      <Card.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
            />
            <Form.Control.Feedback type="invalid">
              Name is required.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              required
              as="textarea"
              rows={2}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
            />
            <Form.Control.Feedback type="invalid">
              Description is required.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              required
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g. 25.990.000"
            />
            <Form.Control.Feedback type="invalid">
              Price is required.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Current Price</Form.Label>
            <Form.Control
              required
              name="currentPrice"
              value={formData.currentPrice}
              onChange={handleChange}
              placeholder="e.g. 20.990.000"
            />
            <Form.Control.Feedback type="invalid">
              Current price is required.
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" variant="success">
            Add Product
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default AddProductForm
