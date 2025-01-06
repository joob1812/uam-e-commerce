// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'
import Layout from './layouts/Layout'
import Home from './pages/Home'
import AddProduct from './pages/AddProduct'
import Cart from './pages/Cart'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/my-cart" element={<Cart />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App