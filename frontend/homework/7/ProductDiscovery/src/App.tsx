
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home'
import ProductDetails from './pages/ProductDetails/ProductDetails'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/product/:id' element={<ProductDetails />} />
      </Routes>
    </Router>
  )
}

export default App
