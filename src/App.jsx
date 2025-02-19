
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Placas from "./pages/Placas"

function App() {
  return (
   <Router>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/placa" element={<Placas/>}></Route>
    </Routes>
   </Router> 
  )
}

export default App
