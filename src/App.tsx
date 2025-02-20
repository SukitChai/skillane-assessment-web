import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Welcome from "./pages/welcome";
import ResetPassword from "./pages/reset-password";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Welcome />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
