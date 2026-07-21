# Lab 06 — Redux Toolkit trong ReactJS (Counter · Todos · Posts)

> Hướng dẫn thực hành step-by-step dưới dạng TODO. Giao diện dùng **React-Bootstrap**. Làm lần lượt từng phần, đánh dấu `[x]` khi hoàn thành, và chạy **Checklist kiểm tra** ở cuối mỗi phần trước khi sang bước tiếp theo.

**Mục tiêu:** dựng một app React dùng Redux Toolkit với 3 tính năng:
- **Counter** — state đồng bộ đơn giản (số đếm).
- **Todos** — thao tác trên mảng (thêm/xoá/toggle).
- **Posts** — gọi API bất đồng bộ bằng `createAsyncThunk`.

**Stack:** React 18 + Vite + JavaScript + `@reduxjs/toolkit` + `react-redux` + **`react-bootstrap` + `bootstrap`**.

---

## Phần 0 — Khởi tạo project

### TODO
- [ ] Mở terminal tại thư mục muốn chứa project.
- [ ] Chạy `npm create vite@latest redux-rtk-demo`
- [ ] Chọn framework: **React**
- [ ] Chọn variant: **JavaScript**
- [ ] Chọn linter: **ESLint**
- [ ] `cd redux-rtk-demo`
- [ ] Cài dependencies gốc: `npm install`
- [ ] Cài Redux: `npm install @reduxjs/toolkit react-redux`
- [ ] Cài giao diện: `npm install react-bootstrap bootstrap`
- [ ] **Import CSS của Bootstrap** — thêm dòng này vào **đầu** `src/main.jsx`:

```js
import 'bootstrap/dist/css/bootstrap.min.css'
```

- [ ] Chạy thử: `npm run dev` và mở http://localhost:5173
- [ ] Dọn file mẫu: xoá `src/App.css`, làm trống `src/index.css`, xoá logo trong `src/assets`.

### Checklist kiểm tra ✅
- [ ] `npm run dev` chạy không lỗi, trình duyệt hiện trang mặc định của Vite.
- [ ] Trong `package.json` có đủ 4 gói: `@reduxjs/toolkit`, `react-redux`, `react-bootstrap`, `bootstrap`.
- [ ] Font/nút bấm mặc định đã đổi sang style của Bootstrap (chứng tỏ CSS đã import đúng).
- [ ] (Khuyến khích) Đã cài extension **Redux DevTools** trên Chrome/Edge.

---

## Phần 1 — Dựng bộ khung Redux (store + Provider)

> Làm phần này **trước** khi viết tính năng, vì cả 3 tính năng đều cần store.

### TODO
- [ ] Tạo thư mục `src/app/` và thư mục `src/features/`.
- [ ] Tạo file `src/app/store.js` với nội dung tạm (chưa có reducer):

```js
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    // sẽ thêm counter, todos, posts ở các phần sau
  },
})
```

- [ ] Bọc toàn app trong `<Provider>` và import CSS Bootstrap — sửa `src/main.jsx`:

```jsx
import 'bootstrap/dist/css/bootstrap.min.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
```

- [ ] Dọn `src/App.jsx` về khung tối giản dùng `Container`:

```jsx
import { Container } from 'react-bootstrap'

export default function App() {
  return (
    <Container className="py-4" style={{ maxWidth: 680 }}>
      <h1 className="mb-4">Redux Toolkit — Lab 06</h1>
    </Container>
  )
}
```

### Checklist kiểm tra ✅
- [ ] App vẫn chạy, hiện tiêu đề "Redux Toolkit — Lab 06" căn giữa trong `Container`.
- [ ] Console **không** báo lỗi `could not find react-redux context` (nếu có → chưa bọc `<Provider>` đúng).
- [ ] Mở Redux DevTools → thấy store rỗng (chưa có key nào) nhưng **kết nối được**.

---

## Phần 2 — Counter (state đồng bộ)

### TODO — Slice
- [ ] Tạo `src/features/counter/counterSlice.js`:

```js
import { createSlice } from '@reduxjs/toolkit'

const initialState = { value: 0 }

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => { state.value += 1 },
    decrement: (state) => { state.value -= 1 },
    incrementByAmount: (state, action) => { state.value += action.payload },
    reset: (state) => { state.value = 0 },
  },
})

export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions
export const selectCount = (state) => state.counter.value
export default counterSlice.reducer
```

- [ ] Nạp reducer vào store (`src/app/store.js`):

```js
import counterReducer from '../features/counter/counterSlice'
// bên trong reducer: { }
counter: counterReducer,
```

### TODO — Component (React-Bootstrap)
- [ ] Tạo `src/features/counter/Counter.jsx`:

```jsx
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, Button, Form, InputGroup, Stack, Badge } from 'react-bootstrap'
import { increment, decrement, incrementByAmount, reset, selectCount } from './counterSlice'

export default function Counter() {
  const count = useSelector(selectCount)
  const dispatch = useDispatch()
  const [amount, setAmount] = useState(2)

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Card.Title>1. Counter</Card.Title>
        <h2 className="text-center my-3">
          <Badge bg="primary" pill>{count}</Badge>
        </h2>

        <Stack direction="horizontal" gap={2} className="justify-content-center mb-3">
          <Button variant="outline-secondary" onClick={() => dispatch(decrement())}>-1</Button>
          <Button variant="primary" onClick={() => dispatch(increment())}>+1</Button>
          <Button variant="outline-danger" onClick={() => dispatch(reset())}>Reset</Button>
        </Stack>

        <InputGroup>
          <Form.Control
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <Button variant="success" onClick={() => dispatch(incrementByAmount(amount))}>
            + theo lượng
          </Button>
        </InputGroup>
      </Card.Body>
    </Card>
  )
}
```

- [ ] Gắn `<Counter />` vào `App.jsx`.

### Checklist kiểm tra ✅
- [ ] Số đếm hiển thị trong `Badge` màu xanh.
- [ ] Nút **+1 / -1** thay đổi số đúng.
- [ ] Nút **Reset** đưa về 0.
- [ ] Nhập số vào ô input rồi bấm **+ theo lượng** → cộng đúng lượng đó.
- [ ] DevTools thấy các action `counter/increment`, `counter/incrementByAmount`… và `state.counter.value` cập nhật.
- [ ] Hiểu vòng lặp: bấm nút → `dispatch` → reducer tạo state mới → `useSelector` → re-render.

---

## Phần 3 — Todos (thao tác mảng)

### TODO — Slice
- [ ] Tạo `src/features/todos/todosSlice.js`:

```js
import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
  items: [
    { id: nanoid(), text: 'Học nguyên lý Redux', done: true },
    { id: nanoid(), text: 'Thực hành Redux Toolkit', done: false },
  ],
}

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: {
      reducer: (state, action) => { state.items.push(action.payload) },
      prepare: (text) => ({ payload: { id: nanoid(), text, done: false } }),
    },
    toggleTodo: (state, action) => {
      const todo = state.items.find((t) => t.id === action.payload)
      if (todo) todo.done = !todo.done
    },
    removeTodo: (state, action) => {
      state.items = state.items.filter((t) => t.id !== action.payload)
    },
  },
})

export const { addTodo, toggleTodo, removeTodo } = todosSlice.actions
export const selectTodos = (state) => state.todos.items
export default todosSlice.reducer
```

- [ ] Nạp `todos: todosReducer` vào store.

### TODO — Component (React-Bootstrap)
- [ ] Tạo `src/features/todos/Todos.jsx`:

```jsx
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card, Form, Button, InputGroup, ListGroup } from 'react-bootstrap'
import { addTodo, toggleTodo, removeTodo, selectTodos } from './todosSlice'

export default function Todos() {
  const todos = useSelector(selectTodos)
  const dispatch = useDispatch()
  const [text, setText] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    dispatch(addTodo(text.trim()))
    setText('')
  }

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Card.Title>2. Todos</Card.Title>

        <Form onSubmit={submit}>
          <InputGroup className="mb-3">
            <Form.Control
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Thêm việc cần làm..."
            />
            <Button type="submit" variant="primary">Thêm</Button>
          </InputGroup>
        </Form>

        <ListGroup>
          {todos.map((t) => (
            <ListGroup.Item key={t.id} className="d-flex align-items-center gap-2">
              <Form.Check
                type="checkbox"
                checked={t.done}
                onChange={() => dispatch(toggleTodo(t.id))}
              />
              <span
                className="flex-grow-1"
                style={{ textDecoration: t.done ? 'line-through' : 'none' }}
              >
                {t.text}
              </span>
              <Button size="sm" variant="outline-danger" onClick={() => dispatch(removeTodo(t.id))}>
                Xoá
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  )
}
```

- [ ] Gắn `<Todos />` vào `App.jsx`.

### Checklist kiểm tra ✅
- [ ] Danh sách hiển thị dạng `ListGroup`, mỗi dòng có checkbox + nút Xoá.
- [ ] Gõ nội dung + bấm **Thêm** → todo mới xuất hiện, ô input tự xoá trắng.
- [ ] Submit khi ô trống **không** thêm todo rỗng.
- [ ] Tick checkbox → chữ bị gạch ngang (toggle done).
- [ ] Bấm **Xoá** → todo biến mất.
- [ ] Mỗi item có `key={t.id}` (không dùng index) → console không cảnh báo key.
- [ ] DevTools thấy action `todos/addTodo`, `todos/toggleTodo`, `todos/removeTodo`.

---

## Phần 4 — Posts (bất đồng bộ / gọi API)

### TODO — Slice
- [ ] Tạo `src/features/posts/postsSlice.js`:

```js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
  if (!res.ok) throw new Error('Fetch thất bại')
  return await res.json()
})

const initialState = { items: [], status: 'idle', error: null }

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (s) => { s.status = 'loading'; s.error = null })
      .addCase(fetchPosts.fulfilled, (s, a) => { s.status = 'succeeded'; s.items = a.payload })
      .addCase(fetchPosts.rejected, (s, a) => { s.status = 'failed'; s.error = a.error.message })
  },
})

export const selectPosts = (state) => state.posts
export default postsSlice.reducer
```

- [ ] Nạp `posts: postsReducer` vào store.

### TODO — Component (React-Bootstrap)
- [ ] Tạo `src/features/posts/Posts.jsx`:

```jsx
import { useSelector, useDispatch } from 'react-redux'
import { Card, Button, ListGroup, Spinner, Alert } from 'react-bootstrap'
import { fetchPosts, selectPosts } from './postsSlice'

export default function Posts() {
  const { items, status, error } = useSelector(selectPosts)
  const dispatch = useDispatch()
  const loading = status === 'loading'

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <Card.Title>3. Posts (async / API)</Card.Title>

        <Button variant="primary" className="mb-3" disabled={loading} onClick={() => dispatch(fetchPosts())}>
          {loading ? (
            <>
              <Spinner as="span" size="sm" animation="border" className="me-2" />
              Đang tải...
            </>
          ) : 'Tải bài viết'}
        </Button>

        {status === 'failed' && <Alert variant="danger">Lỗi: {error}</Alert>}

        <ListGroup variant="flush">
          {items.map((p) => (
            <ListGroup.Item key={p.id}><b>{p.title}</b></ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  )
}
```

- [ ] Gắn `<Posts />` vào `App.jsx`.

### Checklist kiểm tra ✅
- [ ] Bấm **Tải bài viết** → nút hiện `Spinner` + "Đang tải..." rồi hiện 5 tiêu đề.
- [ ] Trong lúc tải, nút bị **disabled** (không bấm chồng được).
- [ ] DevTools thấy đúng chuỗi 3 action: `posts/fetchPosts/pending` → `.../fulfilled` (hoặc `.../rejected`).
- [ ] Thử tắt mạng rồi bấm lại → hiện `Alert` màu đỏ "Lỗi: ..." (nhánh `rejected`).
- [ ] Hiểu: reducer **không** gọi API; API nằm trong thunk, kết quả cập nhật qua `extraReducers`.

---

## Phần 5 — Hoàn thiện & nghiệm thu

### TODO
- [ ] `App.jsx` render đủ 3 component trong `Container`:

```jsx
import { Container } from 'react-bootstrap'
import Counter from './features/counter/Counter'
import Todos from './features/todos/Todos'
import Posts from './features/posts/Posts'

export default function App() {
  return (
    <Container className="py-4" style={{ maxWidth: 680 }}>
      <h1 className="mb-4">Redux Toolkit — Lab 06</h1>
      <Counter />
      <Todos />
      <Posts />
    </Container>
  )
}
```

- [ ] Kiểm tra `src/app/store.js` đã có đủ 3 reducer:

```js
reducer: {
  counter: counterReducer,
  todos: todosReducer,
  posts: postsReducer,
}
```

- [ ] Chạy `npm run build` để chắc chắn không lỗi biên dịch.
- [ ] (Tuỳ chọn) Viết `README.md` mô tả cách chạy.

### Checklist nghiệm thu cuối cùng ✅
- [ ] 3 tính năng hiển thị trong 3 `Card` riêng, giao diện gọn gàng theo Bootstrap.
- [ ] Cả 3 tính năng hoạt động độc lập, không ảnh hưởng lẫn nhau.
- [ ] `npm run build` thành công (thư mục `dist/` được tạo).
- [ ] Redux DevTools hiển thị state gồm 3 nhánh: `counter`, `todos`, `posts`.
- [ ] Không có lỗi/cảnh báo đỏ trong Console trình duyệt.
- [ ] Code tổ chức theo feature folder (`features/counter`, `features/todos`, `features/posts`).

---

## Bảng tổng kết 6 khái niệm cần nắm

| Việc | Công cụ RTK | Xuất hiện ở |
|---|---|---|
| Tạo store | `configureStore` | Phần 1 |
| Cấp store cho app | `<Provider store={store}>` | Phần 1 |
| Tạo state + reducer + action | `createSlice` | Counter, Todos |
| Đọc state | `useSelector(selector)` | cả 3 |
| Ghi state | `useDispatch()` + `dispatch(action())` | cả 3 |
| Gọi API bất đồng bộ | `createAsyncThunk` + `extraReducers` | Posts |

## Component React-Bootstrap đã dùng

| Component | Dùng ở | Vai trò |
|---|---|---|
| `Container` | App | Khung căn giữa, responsive |
| `Card` | cả 3 | Bọc mỗi tính năng thành một thẻ |
| `Button` | cả 3 | Nút bấm (`variant`, `size`, `disabled`) |
| `Form` / `Form.Control` / `Form.Check` | Counter, Todos | Ô nhập liệu, checkbox |
| `InputGroup` | Counter, Todos | Ghép input + button liền nhau |
| `ListGroup` | Todos, Posts | Danh sách item |
| `Spinner` | Posts | Hiệu ứng đang tải |
| `Alert` | Posts | Hiển thị lỗi |
| `Badge` / `Stack` | Counter | Hiển thị số, xếp nút ngang |

## Lỗi thường gặp

- [ ] **Quên `import 'bootstrap/dist/css/bootstrap.min.css'`** → component vẫn chạy nhưng mất hết style.
- [ ] **Quên nạp reducer vào store** → `state.xxx` là `undefined` trong selector.
- [ ] **Quên `<Provider>`** → lỗi "could not find react-redux context".
- [ ] **Gọi API trong reducer** → sai; phải dùng `createAsyncThunk`.
- [ ] **Sửa trực tiếp state ngoài slice** (vd `state.value = 5` trong component) → chỉ đổi qua `dispatch`.
- [ ] **Dùng index làm key** trong `.map()` → nên dùng `id` duy nhất.
