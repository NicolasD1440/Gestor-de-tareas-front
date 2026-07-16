import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "../src/components/Routes/ProtectedRoute";
import Home from "./pages/home/Home";
import Login from "./pages/login/login"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;