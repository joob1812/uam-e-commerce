// import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { app, analytics } from './firebase'; 
import { useEffect } from "react";  // Nouvel import pour utiliser `useEffect` pour l'initialisation Firebase

import './App.css'
import Layout from './layouts/Layout'
import Home from './pages/Home'
import AddProduct from './pages/AddProduct'
import Cart from './pages/Cart'
function App() {

  useEffect(() => {
    console.log('Firebase app initialized', app); // Exemple d'utilisation de `app`
    console.log('Analytics initialized', analytics); // Exemple d'utilisation de `analytics`
  }, []);

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