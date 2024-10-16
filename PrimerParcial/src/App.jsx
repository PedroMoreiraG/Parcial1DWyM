import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Principales/Home/Home";
import Details from "./Principales/Detalles/Detalles";
import Edit from "./Principales/Edit/Edit";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes> 
    </BrowserRouter>
  );
}

export default App;

