import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Products from './components/Products';
import Footer from './layouts/Footer';
import Header from './layouts/Header';
import cookie from 'react-cookies'
import { Container } from 'react-bootstrap';
import ProductDetail from './components/ProductDetail';
import ShopDetail from './components/ShopDetail';
import Login from './components/Login';
import { CartContext, MyUserContext } from './configs/MyContext';
import { useReducer, useState } from 'react';
import MyUserReducer from './reducers/MyUserReducer';
import Register from './components/Register';
import 'moment/locale/vi'
import moment from 'moment';
import CartDetail from './components/CartDetail';
import CartReducer from './reducers/CartReducer';
import CartCheckout from './components/CartCheckout';

moment().local("vi")

function App() {
  const [user, dispatch] = useReducer(MyUserReducer, cookie.load('current-user') || null)
  const [stateCart, dispatchCart] = useReducer(CartReducer, [])
  
  return (
    <MyUserContext.Provider value={[user, dispatch]}>
      <CartContext.Provider value={[stateCart, dispatchCart]}>
        <BrowserRouter>
          <Header />

          <Container>
            <Routes>
              <Route path='/' element={<Products />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/products/:productId' element={<ProductDetail />} />
              <Route path='/shops/:shopId/products' element={<ShopDetail />} />
              <Route path='/cart' element={<CartDetail />} />
              <Route path='/cart/checkout' element={<CartCheckout />} />
              <Route path='*' element={<div className='alert alert-info m-1'>Coming soon...</div>} /> 
            </Routes>
          </Container>

          <Footer />
        </BrowserRouter>
      </CartContext.Provider>
    </MyUserContext.Provider>
  );
}

export default App;
