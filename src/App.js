import './App.scss';
import Navbar from './components/Navbar';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

import HomePage from './components/HomePage';
import SearchPage from './components/SearchPage';
import DetailPage from './components/DetailPage';
import CartPage from './components/CartPage';

function App() {
  const cartItems = useSelector((state) => state.cartItems);
  const initialState = {cartItems};

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/product/:id" element={<DetailPage />} />
          <Route path="/cart" element={<CartPage {...initialState}/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
