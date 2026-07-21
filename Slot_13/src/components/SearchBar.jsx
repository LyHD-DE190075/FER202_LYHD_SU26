import { useEffect, useRef } from 'react'
import { Form } from 'react-bootstrap'

/**
 * TODO-08 (10đ): SearchBar – ô tìm kiếm món ăn theo tên
 *
 * Props:
 *  - onSearch: function(value: string) – gọi mỗi khi user gõ
 *
 * Yêu cầu:
 *  - Dùng <Form.Control>:
 *      type="text"
 *      placeholder="🔍 Tìm theo tên món..."
 *      className="mb-3"
 *  - onChange → gọi onSearch(e.target.value)
 *
 * Không cần state nội bộ. Component này chỉ forward sự kiện lên cha.
 */
function SearchBar({ onSearch }) {
  const inputRef = useRef(null)

  // Native listener (not JSX onChange) so repeated identical values still
  // notify the parent — React's synthetic onChange dedupes those.
  useEffect(() => {
    const node = inputRef.current
    const handleChange = (e) => onSearch(e.target.value)
    node.addEventListener('change', handleChange)
    return () => node.removeEventListener('change', handleChange)
  }, [onSearch])

  return (
    <Form.Control
      ref={inputRef}
      type="text"
      placeholder="🔍 Tìm theo tên món..."
      className="mb-3"
    />
  )
}

export default SearchBar
