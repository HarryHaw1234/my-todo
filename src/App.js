import "./App.css";
import "allotment/dist/style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <main className="main">
      <Routes>
        <Route path="/" element={<LoginPage />}/>
        <Route path="/home" element={<Home />}/>
      </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
