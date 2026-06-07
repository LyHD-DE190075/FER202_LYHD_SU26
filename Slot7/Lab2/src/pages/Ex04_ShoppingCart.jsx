/**
 * Bài 4 – Shopping Cart (useReducer)
 * =====================================
 */
import { useReducer } from 'react'
import { Card, Button, Table, Badge, Row, Col, Form } from 'react-bootstrap'

const PRODUCTS = [
  { id: 1, name: 'Áo thun', price: 150_000 },
  { id: 2, name: 'Quần jean', price: 350_000 },
  { id: 3, name: 'Giày vải', price: 280_000 },
]

// TODO 1: Định nghĩa initialState
const initialState = { items: [] }

// TODO 2: Viết reducer(state, action)
function reducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(i => i.id === action.payload.id)
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(i => 
            i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i
          )
        }
      }
      return { ...state, items: [...state.items, { ...action.payload, qty: 1 }] }
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.payload) }
    case 'UPDATE_QTY': {
      const { id, qty } = action.payload
      if (qty <= 0) {
        return { ...state, items: state.items.filter(i => i.id !== id) }
      }
      return {
        ...state,
        items: state.items.map(i => i.id === id ? { ...i, qty } : i)
      }
    }
    case 'CLEAR_CART':
      return initialState
    default:
      return state
  }
}

export default function Ex04_ShoppingCart() {
  // TODO 3: Gọi useReducer
  const [state, dispatch] = useReducer(reducer, initialState)

  // TODO 4: Tính derived state
  const total = state.items.reduce((sum, item) => sum + item.price * item.qty, 0)
  const itemCount = state.items.reduce((sum, item) => sum + item.qty, 0)

  return (
    <Card className="mx-auto" style={{ maxWidth: 650 }}>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <strong>Bài 4 – Shopping Cart</strong>
        <Badge bg="danger" data-testid="item-count">{itemCount}</Badge>
      </Card.Header>
      <Card.Body>
        <h6>Sản phẩm</h6>
        <Row className="mb-4">
          {PRODUCTS.map(p => (
            <Col key={p.id} xs={4}>
              <Card>
                <Card.Body className="p-2 text-center">
                  <div><strong>{p.name}</strong></div>
                  <div className="text-muted small">{p.price.toLocaleString()}đ</div>
                  <Button
                    size="sm"
                    className="mt-1"
                    data-testid={`btn-add-${p.id}`}
                    onClick={() => dispatch({ type: 'ADD_ITEM', payload: p })}
                  >
                    + Thêm
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        <h6>Giỏ hàng</h6>
        <Table size="sm" bordered data-testid="cart-table">
          <thead>
            <tr>
              <th>Sản phẩm</th>
              <th>Đơn giá</th>
<th>Số lượng</th>
              <th>Thành tiền</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {state.items.map(item => (
              <tr key={item.id} data-testid={`cart-row-${item.id}`}>
                <td>{item.name}</td>
                <td>{item.price.toLocaleString()}đ</td>
                <td>
                  <Form.Control
                    type="number"
                    size="sm"
                    style={{ width: 60 }}
                    data-testid={`qty-input-${item.id}`}
                    value={item.qty}
                    onChange={(e) => dispatch({ 
                      type: 'UPDATE_QTY', 
                      payload: { id: item.id, qty: Number(e.target.value) } 
                    })}
                  />
                </td>
                <td>{(item.price * item.qty).toLocaleString()}đ</td>
                <td>
                  <Button 
                    variant="danger" 
                    size="sm" 
                    data-testid={`btn-remove-${item.id}`}
                    onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
                  >Xóa</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="d-flex justify-content-between align-items-center">
          <strong data-testid="cart-total">Tổng: {total.toLocaleString()}đ</strong>
          <Button 
            variant="outline-danger" 
            size="sm" 
            data-testid="btn-clear-cart"
            onClick={() => dispatch({ type: 'CLEAR_CART' })}
          >
            Xóa giỏ hàng
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}