import { Container } from 'react-bootstrap'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import React from 'react';
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';

function App() {
  return (
    <div style={{ minWidth:'500px'}}>
      <BrowserRouter>
        <Header />
        <main className='py-3'>
          <Container>
            <Routes>
              <Route path="/" element={<HomeScreen />} exact />
              <Route path="/products/:id" element={<ProductScreen />} />
              <Route path="cart" element={<CartScreen />} >
                <Route path=":id" element={<CartScreen />} />
              </Route>


            </Routes>
          </Container>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
