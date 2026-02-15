import Navbar from "./components/Navbar"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HOME_URL, SUCCESS_URL } from "./utils/config";
import Home from "./pages/Home";
import Success from "./components/SuccessPage";
import NotFound from "./components/NotFound";

function App() {

  return (
    <>
    <Navbar />
    <Router>
      <Routes>
        <Route path={HOME_URL} element={<Home />}/>
        <Route path={SUCCESS_URL} element={<Success />}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
