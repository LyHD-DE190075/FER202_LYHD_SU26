import { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'

const INITIAL_FORM = { name: '', price: '', category: 'Món nước' }

const CATEGORIES = ['Món nước', 'Cơm', 'Khai vị', 'Tráng miệng', 'Đồ uống']

/**
 * TODO-04 (15đ): Form thêm món ăn mới (controlled component)
 *
 * Props:
 *  - onAdd: function(menuData) – gọi khi submit thành công
 *
 * State cần có:
 *  - form: { name, price, category }   (dùng INITIAL_FORM)
 *
 * Yêu cầu:
 *  1. Ba trường input (controlled – value + onChange):
 *       a. Text input "Tên món"     → form.name
 *       b. Number input "Giá (₫)"  → form.price
 *       c. Select "Danh mục"       → form.category  (options từ CATEGORIES)
 *
 *  2. Validate trước khi submit:
 *       - name không rỗng (sau trim)
 *       - price là số dương (Number(price) > 0)
 *       Nếu không hợp lệ → return sớm, KHÔNG gọi onAdd
 *
 *  3. Khi submit hợp lệ:
 *       - Gọi: onAdd({ name: form.name.trim(), price: Number(form.price),
 *                       category: form.category, available: true })
 *       - Reset form về INITIAL_FORM
 *
 *  Gợi ý handleChange:
 *    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
 */
function AddMenuForm({ onAdd }) {
  const [form, setForm] = useState(INITIAL_FORM)

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.name.trim() || !(Number(form.price) > 0)) return

    onAdd({
      name: form.name.trim(),
      price: Number(form.price),
      category: form.category,
      available: true,
    })
    setForm(INITIAL_FORM)
  }

  return (
    <Form onSubmit={handleSubmit} className="mb-3">
      <Row className="g-2 align-items-end">
        <Col md={4}>
          <Form.Control
            name="name"
            placeholder="Tên món"
            value={form.name}
            onChange={handleChange}
          />
        </Col>
        <Col md={3}>
          <Form.Control
            type="number"
            name="price"
            placeholder="Giá (₫)"
            value={form.price}
            onChange={handleChange}
          />
        </Col>
        <Col md={3}>
          <Form.Select name="category" value={form.category} onChange={handleChange}>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </Form.Select>
        </Col>
        <Col md={2}>
          <Button type="submit" variant="primary" className="w-100">Thêm</Button>
        </Col>
      </Row>
    </Form>
  )
}

export default AddMenuForm
