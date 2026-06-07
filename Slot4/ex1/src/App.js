import React from 'react';
import './App.css';
import Footer from './component/Footer'; 
import PizzaList from './component/PizzaList';
import MyCarousel from './component/MyCarousel';
import MyNavbar from './component/MyNavbar';
function App() {
  return (
    <div className="App">
      <MyNavbar />
      <main style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Welcome to My Pizza Store</h1>
        <MyCarousel />
        <PizzaList />
        
      </main>
      
    </div>
  );
}

export default App;