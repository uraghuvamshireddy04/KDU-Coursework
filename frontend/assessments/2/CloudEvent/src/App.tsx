import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HOME_URL, STATUSPAGE_URL } from "./utils/Routes";
import Home from "./pages/Home";
import NotFound from "./components/NotFound";
import StatusPage from "./pages/StatusPage";

function App() {

  return (
     <Router>
      <Routes>
        <Route path={HOME_URL} element={<Home />} />
        <Route path={STATUSPAGE_URL} element={<StatusPage />}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>
     </Router>
  )
}

export default App
