import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Products from './components/Products';
import Footer from './layouts/Footer';
import Header from './layouts/Header';
import { Container } from 'react-bootstrap';
import ProductDetail from './components/ProductDetail';

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Container>
        <Routes>
          <Route path='/' element={<Products />} />
          <Route path='/products/:productId' element={<ProductDetail />} />
        </Routes>
      </Container>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
