import { Routes, Route } from 'react-router'
import './App.css'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Product from './pages/Product'
import Checkout from './pages/Checkout'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import PrivateRoutes from './components/PrivateRoutes'
import ProductList from './pages/ProductList'

function App() {
  return (

    <Routes>
      <Route path='/signup' element={<Signup />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/' element={<PrivateRoutes>
        <Home />
        </PrivateRoutes>
        }/>
      <Route path='/cart' element={
        <PrivateRoutes>
        <Cart />
        </PrivateRoutes>
        }/>
      <Route path='/product/:id' element={
        <PrivateRoutes>

          <Product />
        </PrivateRoutes>
        }/>

      <Route path='/product' element={<PrivateRoutes>
        <ProductList />
      </PrivateRoutes>}/>
      <Route path='/checkout' element={
        <PrivateRoutes>

          <Checkout />
        </PrivateRoutes>
        }/>
      <Route path='/forgotpassword' element={<ForgotPassword />}/>
    </Routes>
  )
}

export default App
