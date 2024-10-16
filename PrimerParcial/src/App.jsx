import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Principales/Home/Home";
import Details from "./Principales/Detalles/Detalles";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes> 
    </BrowserRouter>
  );
}

export default App;

