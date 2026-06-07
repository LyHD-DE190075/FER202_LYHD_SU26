function People() {
  const personList = [
    { id: 1, name: "Nguyễn Văn A", age: 25 },
    { id: 2, name: "Trần Thị B", age: 30 },
    { id: 3, name: "Lê Hoàng C", age: 22 },
    { id: 4, name: "Phạm Minh D", age: 15 },
    { id: 5, name: "Vũ Thị E", age: 18 }, 
    { id: 6, name: "Ngô Văn F", age: 40 },
    { id: 7, name: "Đỗ Thị G", age: 12 },
    { id: 8, name: "Hoàng Văn H", age: 25 },
    { id: 9, name: "Bùi Thị I", age: 19 },
    { id: 10, name: "Lý Văn K", age: 35 }
  ];

  const firstTeenager = personList.find(person => person.age >= 13 && person.age <= 19);

  const sortedList = [...personList].sort((a, b) => {
    if (a.age !== b.age) {
      return a.age - b.age;
    }
    return a.name.localeCompare(b.name);
  });

  return (
    <div>
      <h2>Danh sách 10 người dùng</h2>
      
      <ol>
        {personList.map((person) => (
          <li key={person.id}>
            <strong>Tên:</strong> {person.name} - <strong>Tuổi:</strong> {person.age}
          </li>
        ))}
      </ol>

      <hr style={{ margin: "20px 0" }} />

      <h3>Kết quả tìm kiếm Teenager đầu tiên:</h3>
      {firstTeenager ? (
        <div>
          <p>
            Tìm thấy: <strong>{firstTeenager.name}</strong> ({firstTeenager.age} tuổi) - ID: {firstTeenager.id}
          </p>
        </div>
      ) : (
        <div>
          <p>
            No result
          </p>
        </div>
      )}

      <hr />

      <h2>Bảng danh sách đã sắp xếp (Tuổi tăng dần, sau đó theo Tên)</h2>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {sortedList.map((person) => (
            <tr key={person.id}>
              <td>{person.id}</td>
              <td>{person.name}</td>
              <td>{person.age}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default People;