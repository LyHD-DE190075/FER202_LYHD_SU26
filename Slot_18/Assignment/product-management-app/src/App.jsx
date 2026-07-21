import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProductDetailPage from './pages/ProductDetailPage'
import EditProductPage from './pages/EditProductPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />
      <Route path="/products/:id/edit" element={<EditProductPage />} />
    </Routes>
  )
}

export default App
