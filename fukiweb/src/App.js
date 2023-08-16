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
import { MyUserContext } from './configs/MyContext';
import { useReducer } from 'react';
import MyUserReducer from './reducers/MyUserReducer';
import Register from './components/Register';

function App() {
  const [user, dispatch] = useReducer(MyUserReducer, cookie.load('current-user') || null)
  return (
    <MyUserContext.Provider value={[user, dispatch]}>
      <BrowserRouter>
        <Header />

        <Container>
          <Routes>
            <Route path='/' element={<Products />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/products/:productId' element={<ProductDetail />} />
            <Route path='/shops/:shopId/products' element={<ShopDetail />} />
            <Route path='*' element={<div className='alert alert-info m-1'>Coming soon...</div>} /> 
          </Routes>
        </Container>

        <Footer />
      </BrowserRouter>
    </MyUserContext.Provider>
  );
}

export default App;
