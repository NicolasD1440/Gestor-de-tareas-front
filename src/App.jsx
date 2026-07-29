import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "../src/components/Routes/ProtectedRoute";
import Home from "./pages/home/Home";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Profile from "./pages/profile/profileUser";
import Panel from "./pages/panel/panel";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/panel" element={<Panel/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route path="/login" element={<Login />} ></Route>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;