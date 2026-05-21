import React from 'react';
import './App.css';
import Footer from './component/Footer'; 
import PizzaList from './component/PizzaList';
function App() {
  return (
    <div className="App">
      <main style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Welcome to My Pizza Store</h1>
        <PizzaList />
        
      </main>
      <Footer />
    </div>
  );
}

export default App;