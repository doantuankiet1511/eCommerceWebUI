import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Products from './components/Products';
import Footer from './layouts/Footer';
import Header from './layouts/Header';
import { Container } from 'react-bootstrap';
import ProductDetail from './components/ProductDetail';
import ShopDetail from './components/ShopDetail';

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Container>
        <Routes>
          <Route path='/' element={<Products />} />
          <Route path='/products/:productId' element={<ProductDetail />} />
          <Route path='/shops/:shopId/products' element={<ShopDetail />} />
          <Route path='*' element={<div className='alert alert-info m-1'>Coming soon...</div>} /> 
        </Routes>
      </Container>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
