import './App.scss';
import Navbar from './components/Navbar';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';

import HomePage from './components/HomePage';
import SearchPage from './components/SearchPage';
import DetailPage from './components/DetailPage';
import CartPage from './components/CartPage';
import SearchBar from './components/SearchBar';

function App() {

  const submitSearch = (searchText: any) => {
    console.log(searchText);
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <SearchBar submitSearch={submitSearch}/>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/detail" element={<DetailPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
