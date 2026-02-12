import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import {  HOME_URL, USER_PAGE } from "./config/Config";
import Home from "./pages/Home/index";
import UserDetails from "./pages/UserDetails";
import NotFound from "./components/NotFound";

function App() {

  return (
    <Router>
      <Routes>
        <Route path={HOME_URL} element={<Home />}/>
        <Route path={USER_PAGE} element={<UserDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
