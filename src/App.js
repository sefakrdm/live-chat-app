import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import "./style.css";

function App() {
  const { loginUser } = useContext(AuthContext);

  const RedirectCheck = ({ children }) => {
    if (!loginUser) {
      return (<Navigate to="/login" />)
    }

    return children
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<RedirectCheck><Home /></RedirectCheck>} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
