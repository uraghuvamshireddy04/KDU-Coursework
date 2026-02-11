import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Home from './pages/Home/Home'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import Navbar from "./components/Navbar/Navbar";
import ErrorPage from "./components/ErrorPage/Error";
import { CART_PAGE, HOME_URL, PRODUCT_PAGE } from "./config/Config";
import { Provider } from "react-redux";
import { store } from "./store";
import CartPage from "./pages/Cart/CartPage";
import NotFound from "./components/NotFound/NotFound";

function App() {

  return (
    <Provider store={store}>
    <Router>
      <Navbar />
      <Routes>
        <Route path={HOME_URL} element={<Home />}/>
        <Route path={PRODUCT_PAGE} element={<ProductDetails />} />
        <Route path={CART_PAGE} element={<CartPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
    </Provider>
  )
}

export default App
