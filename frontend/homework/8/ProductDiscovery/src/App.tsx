import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Home from './pages/Home/Home'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import Navbar from "./components/Navbar/Navbar";
import ErrorPage from "./components/ErrorPage/Error";
import { HOME_URL, PRODUCT_PAGE } from "./config/Config";

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path={HOME_URL} element={<Home />}/>
        <Route path={PRODUCT_PAGE} element={<ProductDetails />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  )
}

export default App
