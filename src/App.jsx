import { Routes, Route } from "react-router-dom";

import Header from './components/Header/Header'
import CartDrawer from './components/CartDrawer/CartDrawer'
import Home from "./pages/Home/Home";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import './App.css'

function App() {
  return (
    <>
      <Header />
      <CartDrawer />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/producto/:id" element={<ProductDetail />} />
        </Routes>
      </main>
    </>
  )
}

export default App
