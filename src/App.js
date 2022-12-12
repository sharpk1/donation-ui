import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Reports from "./Reports";
import Login from "./Login";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}>
            <Route index element={<Login />} />
          </Route>
          <Route path="/home" element={<Home />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
